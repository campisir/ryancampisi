let wasmInstance = null;

const imports = {
  env: {
    __memory_base: 0,
    __table_base: 0,
    memory: new WebAssembly.Memory({ initial: 1024 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
    _emscripten_get_now: Date.now,
    __cxa_throw: (ptr, type, destructor) => {},
    emscripten_date_now: () => Date.now(),
    __syscall_openat: () => {},
    emscripten_resize_heap: () => false,
    _abort_js: () => {},
    __syscall_fcntl64: () => {},
    __syscall_ioctl: () => {},
    _tzset_js: () => {},
  },
  wasi_snapshot_preview1: {
    fd_close: () => {},
    fd_write: () => {},
    fd_seek: () => {},
    fd_read: () => {},
    environ_sizes_get: () => {},
    environ_get: () => {},
  }
};

fetch('main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, imports))
  .then(results => {
    wasmInstance = results.instance;
    console.log("WASM exports:", Object.keys(wasmInstance.exports));
    if (typeof wasmInstance.exports.my_main !== 'function') {
      postMessage({ type: 'error', message: 'my_main not exported!' });
      return;
    }
    postMessage({ type: 'wasmLoaded' });
})
  .catch(error => {
    postMessage({ type: 'error', message: error.message });
  });

  // Helper to read a null-terminated string from WASM memory
function readWasmString(ptr) {
    const mem = new Uint8Array(wasmInstance.exports.memory.buffer);
    let str = "";
    while(mem[ptr] !== 0) {
        str += String.fromCharCode(mem[ptr]);
        ptr++;
    }
    return str;
}

function allocateString(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str + "\0");
    const len = bytes.length;
    const malloc = wasmInstance.exports._malloc || wasmInstance.exports.malloc;
    const free = wasmInstance.exports._free || wasmInstance.exports.free;
    if (!malloc || !free) {
        throw new Error("malloc/free not exported from WASM module");
    }
    const ptr = malloc(len);
    const memory = new Uint8Array(wasmInstance.exports.memory.buffer);
    memory.set(bytes, ptr);
    return { ptr, free };
}

onmessage = function(e) {
    if (e.data.type === 'runWasm') {
      const moves = e.data.moves;
      if (!wasmInstance) {
        postMessage({ type: 'result', result: 'Error: wasm module not loaded' });
        return;
      }
      try {
        const { ptr, free } = allocateString(moves);
        const resultPtr = wasmInstance.exports.my_main(ptr);
        const output = readWasmString(resultPtr);
        free(ptr);
        postMessage({ type: 'result', result: output });
      } catch (err) {
        postMessage({ type: 'result', result: 'Error executing wasm function: ' + err.message });
      }
    }
  };