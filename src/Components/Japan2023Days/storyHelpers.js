import React, { useState } from 'react';

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

/* Food entry: a food photo with a caption (always ends with "See also: Food")
   plus Location / About tabs so each dish gets its own structured context. */
export const FoodEntry = ({
  src,
  alt = '',
  caption,
  locationUrl,
  locationName = 'Location',
  about,
  onGoToFood,
  defaultTab = 'location',
}) => {
  const [tab, setTab] = useState(defaultTab);

  return (
    <div className="jp-story-food-entry">
      <div className="jp-story-media-single">
        {imgSlot('jp-story-img-wide', src, alt)}
        <p className="jp-story-caption">
          {caption}{' '}
          See also:{' '}
          <button className="jp-story-food-link" onClick={onGoToFood}>Food</button>
        </p>
      </div>

      <div className="jp-food-entry-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'location'}
          className={`jp-food-entry-tab${tab === 'location' ? ' active' : ''}`}
          onClick={() => setTab('location')}
        >
          Location
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'about'}
          className={`jp-food-entry-tab${tab === 'about' ? ' active' : ''}`}
          onClick={() => setTab('about')}
        >
          About
        </button>
      </div>

      <div className="jp-food-entry-panel">
        {tab === 'location' ? (
          <div className="jp-food-entry-location">
            <div className="jp-food-entry-map">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="jp-food-entry-map-name">{locationName}</span>
            </div>
            <a
              className="jp-food-entry-map-link"
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        ) : (
          <p className="jp-food-entry-about">{about}</p>
        )}
      </div>
    </div>
  );
};
