import React from 'react';

export const DesignSwitcher = ({ value, onChange, options }) => (
  <div className="jpd-switcher" role="group" aria-label="Preview day page design">
    <span className="jpd-switcher-label">Preview design</span>
    {options.map((opt) => (
      <button
        key={opt.id}
        type="button"
        className={`jpd-switcher-btn${value === opt.id ? ' active' : ''}`}
        aria-pressed={value === opt.id}
        onClick={() => onChange(opt.id)}
      >
        <strong>{opt.id}</strong> {opt.name}
      </button>
    ))}
  </div>
);
