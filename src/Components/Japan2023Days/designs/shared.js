import React, { useEffect, useState } from 'react';

/* Shared helpers for the day-page designs (Journal, plus the archived Scrapbook and Route).

   Story shape (see May31.js). Text and captions may be strings or JSX (for inline links).
   {
     title:  'Flight to Japan',            // revealed only in the end-of-day recap
     recap:  ['Stop one', 'Stop two'],     // revealed only in the end-of-day recap
     blocks: [
       { type: 'p',        text },
       { type: 'video',    src, caption },                    // no src = "coming soon" placeholder
       { type: 'photos',   items: [{ src, alt, caption }] },  // 1 = single, 2+ = grid; no src = placeholder
       { type: 'food',     src, alt, caption, locationUrl, mapEmbed, locationName, about },  // FoodEntry props
       { type: 'map',      src, title, caption },             // Google Maps embed
       { type: 'location', coords, note, caption },           // map "coming soon" placeholder
       { type: 'rating',   label, grade, reason },
       { type: 'break' },                                     // unlabeled scene break
     ],
   }
*/

export function formatDateParts(date) {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const rest = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const full = `${weekday}, ${rest}`;
  return { weekday, rest, full };
}

/* Fades elements in the first time they scroll into view.
   Elements opt in with the data-reveal attribute. Returns true once active so
   the root can add the "jpd-js" class (content stays visible without JS). */
export function useReveal(rootRef) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // Anything at or above the reveal line counts as seen, so jumping
    // down the page (End key, anchors) never leaves earlier text hidden.
    const pending = new Set(root.querySelectorAll('[data-reveal]'));
    let frame = 0;
    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.92;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.classList.add('is-visible');
          pending.delete(el);
        }
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };

    setReady(true);
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rootRef]);

  return ready;
}

/* Writes scroll progress (0..1) through the element into its --p custom property. */
export function useScrollProgress(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // 1.0 is reached once the end of the element climbs above 85% of the viewport
      const anchor = window.innerHeight * 0.55;
      const span = rect.height - window.innerHeight * 0.3;
      const p = (anchor - rect.top) / Math.max(span, 1);
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    if (ro) ro.observe(el);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (ro) ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}

export const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

export const VideoPlayer = ({ src, className }) => (
  <video controls preload="metadata" className={className}>
    <source src={src} type="video/mp4" />
    <source src={src} type="video/quicktime" />
    Your browser does not support video playback.
  </video>
);

/* After moving to another day, bring the new page's top into view below the sticky nav. */
export function scrollToDayTop() {
  setTimeout(() => {
    const el = document.querySelector('.jpd');
    if (!el) return;
    const navHeight = 112;
    window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight) });
  }, 50);
}
