import React from 'react';

/* Reusable building blocks for story-style day views.
   Import these from any custom day component. */

export const imgSlot = (cls = '', src = null, alt = '') => (
  <div className={['jp-story-img-placeholder', cls, src ? 'jp-story-img-filled' : ''].filter(Boolean).join(' ')}>
    {src ? (
      <img src={src} alt={alt} loading="lazy" className="jp-story-img" />
    ) : (
      <>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.15 }}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span className="jp-story-placeholder-text">Photo coming soon</span>
      </>
    )}
  </div>
);

export const videoSlot = () => (
  <div className="jp-story-video-placeholder">
    <div className="jp-story-play-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    </div>
    <span className="jp-story-placeholder-text">Video coming soon</span>
  </div>
);

export const withCaption = (slot, caption) => (
  <div className="jp-story-media-single">
    {slot}
    <p className="jp-story-caption">{caption}</p>
  </div>
);

export const chapterBreak = (text, variant) => (
  <div className="jp-story-chapter-break">
    <span className={`jp-story-chapter-rule${variant === 'airlift' ? ' jp-chapter-airlift-rule' : ''}`} />
    <span className={`jp-story-chapter-text jp-chapter-${variant}`}>{text}</span>
    <span className={`jp-story-chapter-rule jp-story-chapter-rule-right${variant === 'airlift' ? ' jp-chapter-airlift-rule' : ''}`} />
  </div>
);
