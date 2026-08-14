import React from 'react';
import { imgSlot, videoSlot, withCaption, chapterBreak } from './storyHelpers';

/* June 17, 2023 — Mount Hiei hike.
   Receives shared props from Japan2023.js:
     date, dayNum, tripLength, onBack, onGoToFood, onShowRule */
export default function June17({ date, dayNum, tripLength, onBack, onGoToFood, onShowRule }) {
  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="jp-content jp-day-view jp-story-view">

      {/* Day header — same pattern as template */}
      <div className="jp-day-header">
        <div className="jp-day-header-left">
          <span className="jp-day-num-badge">Day {dayNum} of {tripLength}</span>
          <h2 className="jp-day-date">{formatted}</h2>
        </div>
        <button className="jp-day-close" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6"  y1="6" x2="18" y2="18"/>
          </svg>
          Back to overview
        </button>
      </div>

      {/* Story intro banner */}
      <div className="jp-story-intro">
        <span className="jp-story-intro-tag">Favorite Day</span>
        <h3 className="jp-story-intro-title">Mount Hiei Hike</h3>
        <p className="jp-story-intro-desc">
          The day I went hiking with a few of the students on the program &#8212; and
          one of them got air lifted off the mountain.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── Setup ─────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Another student on the program posted in the class Teams chat that he was
            planning on hiking Mount Hiei. I reached out to join him (see{' '}
            <button
              className="jp-rule-inline"
              onClick={() => onShowRule('rule1')}
            >
              Rule 1
            </button>
            ).
          </p>
        </div>

        {/* ── Cat Temple ────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Nyannyan-ji</h4>
            <span className="jp-story-beat-sub">Basically a cat temple</span>
          </div>
          <p className="jp-story-prose">
            There were five of us in the group. We started out by traveling to
            Nyannyan-ji (basically a cat temple). Japan really loves their cats.
          </p>
          <div className="jp-story-img-grid jp-story-img-grid-4">
            {[
              { src: '/jun17temp/catshrine1.jpeg', alt: 'Nyannyan-ji cat shrine' },
              { src: '/jun17temp/catshrine2.jpeg', alt: 'Nyannyan-ji cat shrine' },
              { src: '/jun17temp/catshrine3.jpeg', alt: 'Nyannyan-ji cat shrine' },
              { src: '/jun17temp/catshrine4.jpeg', alt: 'Nyannyan-ji cat shrine' },
            ].map((p, i) => (
              <div key={i} className="jp-story-grid-cell">{imgSlot('', p.src, p.alt)}</div>
            ))}
          </div>
        </div>

        {/* ── Lunch ─────────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Yase Heihachi</h4>
          </div>
          <p className="jp-story-prose">
            We then ate at Yase Heihachi. I got Tofu Udon.
          </p>
          {withCaption(
            imgSlot('jp-story-img-wide'),
            <>Tofu Udon. See also:{' '}<button className="jp-story-food-link" onClick={onGoToFood}>Food</button></>
          )}
        </div>

        {/* ── Tram ──────────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Tram to the Lookout</h4>
          </div>
          <p className="jp-story-prose">
            Next, we took some tram cars up to this lookout point.
          </p>
          <div className="jp-story-img-grid jp-story-img-grid-4">
            {[
              { src: '/jun17temp/lookoutpoint1.jpeg', alt: 'Lookout point view from Mount Hiei' },
              { src: '/jun17temp/lookoutpoint2.png',  alt: 'Lookout point view from Mount Hiei' },
              { src: '/jun17temp/lookoutpoint3.jpeg', alt: 'Lookout point view from Mount Hiei' },
              { src: '/jun17temp/lookoutpoint4.png',  alt: 'Lookout point view from Mount Hiei' },
            ].map((p, i) => (
              <div key={i} className="jp-story-grid-cell">{imgSlot('', p.src, p.alt)}</div>
            ))}
          </div>
        </div>

        {/* ── Summit ────────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">The Highest Point</h4>
          </div>
          <p className="jp-story-prose">
            One of the other four decided to leave at this point. The remaining four
            of us hiked to the highest point of Mount Hiei.
          </p>
          {withCaption(
            imgSlot('jp-story-img-wide', '/jun17temp/summitsign.jpeg', 'The sign at the highest point of Mount Hiei'),
            'The sign at the highest point of Mount Hiei.'
          )}
        </div>

        {/* ── Off-trail ─────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Into the Unknown</h4>
          </div>
          <p className="jp-story-prose">
            We then decided to do some more hiking. My memory says that we had a
            destination in mind (some sort of overlook idk) but looking at the coordinates we ended up at, I genuinely
            can&#39;t figure out where on earth we were going.
          </p>
          <div className="jp-story-img-grid jp-story-img-grid-2">
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('', '/jun17temp/askingfordirections.jpeg', 'One of the guys asking a Japanese couple for directions')}
              <p className="jp-story-caption">One of the guys asking for directions.</p>
            </div>
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('', '/jun17temp/hiking.jpeg', 'The group hiking on Mount Hiei')}
              <p className="jp-story-caption">
                Did we know where we were going? Who knows. What I do know is that
                this picture has good album cover potential.
              </p>
            </div>
          </div>
        </div>

        {/* ══ TRAGEDY STRIKES ══════════════════════ */}
        {chapterBreak('TRAGEDY STRIKES', 'tragedy')}

        {/* ── Ankle injury ──────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            One of the other three guys injured his ankle. He was unable to continue
            walking, so we called for help.
          </p>
          {withCaption(videoSlot(), 'One of the other guys calling for assistance.')}
          <div className="jp-story-media-single" style={{ marginTop: 16 }}>
            <div className="jp-story-map-placeholder">
              <div className="jp-story-map-pin">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span className="jp-story-map-coords">35.10837&#176; N, 135.840372&#176; E</span>
              <span className="jp-story-map-note">Map visualization coming soon &middot; Mount Hiei</span>
            </div>
            <p className="jp-story-caption">Where we called for help.</p>
          </div>
        </div>

        {/* ══ BRO GETS AIRLIFTED OUT ══════════════ */}
        {chapterBreak('BRO GETS AIRLIFTED OUT', 'airlift')}

        {/* ── Helicopter ────────────────────────── */}
        <div className="jp-story-beat">
          {withCaption(
            videoSlot(),
            'A helicopter picking him up. It felt like I was in a hurricane simulator. If you look at the top left, you can see him getting lifted up.'
          )}
        </div>

        {/* ── Descent ───────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            The remaining three of us then got escorted down the mountain by these
            Japanese guys (I&#39;m assuming because it was getting dark). I&#39;m
            pretty sure we walked for like an hour.
          </p>
          {withCaption(videoSlot(), 'Walking down the mountain.')}
        </div>

        {/* ── Civilization ──────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            We finally reached civilization. We gave our info to some guys at a
            station and then some guy on a scooter escorted us to the bus stop.
          </p>
          {withCaption(videoSlot(), 'A man on a scooter escorting us to the bus stop.')}
        </div>

        {/* ── Dinner ────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            After we arrived back in Kyoto, I ate dinner with the same two guys from
            the hike and later a third person from the program joined us.
          </p>
          <div className="jp-story-food-block">
            <span className="jp-story-food-restaurant">Salman &amp; Sohel Halal Kitchen Kyoto</span>
            <div className="jp-story-media-single">
              {imgSlot('jp-story-img-wide')}
              <p className="jp-story-caption">
                Indian curry, naan, and salad.{' '}
                <button
                  className="jp-rule-inline"
                  onClick={() => onShowRule('rule2')}
                >
                  Rule 2
                </button>
                {' '}approved. See also:{' '}
                <button className="jp-story-food-link" onClick={onGoToFood}>Food</button>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
