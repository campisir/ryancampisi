import React from 'react';
import { imgSlot, withCaption, chapterBreak, FoodEntry } from './storyHelpers';

const VIDEO_URLS = {
  kamo:   'https://dl.dropboxusercontent.com/scl/fi/a6n164p2qz2p047w5tjjp/june3_kamo.mov?rlkey=d78eon4oliaur8s9ze3g1xold&st=mode8ua2&dl=0',
  kamo2:  'https://dl.dropboxusercontent.com/scl/fi/bieg8pgten1hy716nbbga/june3_kamo2.MOV?rlkey=2xzz0yudaog53cw4ogpvr2dcl&st=zensxkti&dl=0',
  round1: 'https://dl.dropboxusercontent.com/scl/fi/i134izpkio5cpd8b6jdmk/june3_round1.mov?rlkey=f5awspdptni92iz1nt87ugc5j&st=pl61qa4h&dl=0',
};

const embeddedVideo = (src, caption) => (
  <div className="jp-story-media-single">
    <div className="jp-story-video-embed">
      <video controls preload="metadata" className="jp-story-video">
        <source src={src} type="video/mp4" />
        <source src={src} type="video/quicktime" />
        Your browser does not support video playback.
      </video>
    </div>
    <p className="jp-story-caption">{caption}</p>
  </div>
);

export default function June3({ date, dayNum, tripLength, onBack, onShowRule, onGoToFood }) {
  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="jp-content jp-day-view jp-story-view">

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

      <div className="jp-story-intro">
        <span className="jp-story-intro-tag">Solo Exploration</span>
        <h3 className="jp-story-intro-title">Kamo River &amp; Round 1</h3>
        <p className="jp-story-intro-desc">
          A Ghibli-esque walk along the Kamo River, a visit to the Round 1 arcade, and my
          first solo restaurant order.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── Kamo River ─────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I spent most of the day walking up and down the Kamo River. Watching the people
            sit along the river and people bike along the sides felt like I was in a Ghibli
            movie. It&#39;s such a beautiful area.
          </p>
          {embeddedVideo(VIDEO_URLS.kamo, 'A view by the Kamo River.')}
          {embeddedVideo(VIDEO_URLS.kamo2, 'Walking beside the Kamo River.')}
        </div>

        {/* ══ ROUND 1 ══════════════════════════════ */}
        {chapterBreak('ROUND 1', 'round1')}

        {/* ── The Arcade ─────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I saw people talking about &#34;Round 1&#34; in the Teams chat. By{' '}
            <button
              className="jp-rule-inline"
              onClick={() => onShowRule('rule1')}
            >
              Rule 1
            </button>
            {', '}I decided to visit it. It was a nice arcade. I tried out the popular
            &#34;MaiMai&#34; game. It was fun, but I was obviously very weak compared to the
            sweaty Japanese teenagers playing around me. You knew they were serious about the
            game when they pulled out special gloves lol.
          </p>
          {embeddedVideo(VIDEO_URLS.round1, 'Walking around one of the floors of Round 1.')}
        </div>

        {/* ══ BOOKOFF ══════════════════════════════ */}
        {chapterBreak('BOOKOFF', 'bookoff')}

        {/* ── Bookoff ────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            My roommate shared with the class that he bought a bunch of cheap Wiis from
            &#34;Bookoff.&#34; I decided to check it out for myself. I visited Bookoff for
            the first time but did not buy anything.
          </p>
          {withCaption(
            imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/7nw45jl3zxmx4ammj78f8/june3_900yenwii.jpg?rlkey=8oywrfjna583jtp6we71y0ar8&st=smjm2t6w&dl=0', 'One of the Wiis sold at Bookoff for 900 yen'),
            'One of the wiis sold at Bookoff for 900 yen. My roommate bought a bunch of these.'
          )}
        </div>

        {/* ══ DINNER ════════════════════════════════ */}
        {chapterBreak('DINNER', 'dinner')}

        {/* ── Curry Ramen ────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I ate curry ramen from Nandattei. This was my first time ordering from a Japanese
            restaurant by myself (unless you count McDonald&#39;s lol). I was quite nervous
            but the &#34;point at the menu&#34; method is lowk OP.
          </p>
          <FoodEntry
            src="https://dl.dropboxusercontent.com/scl/fi/fsz3vqf2gtra3uisfz8pa/june3_dinner.jpg?rlkey=80jryfnwy1hkmcc3qqxleke78&st=aafnvxmg&dl=0"
            alt="Curry ramen"
            caption="Curry ramen"
            locationUrl="https://maps.app.goo.gl/TyZW16JDMLasS1TGA"
            locationName="Nandattei"
            about="I determined the location for this one because I specifically wrote down the name “Nandattei” in my notes."
            onGoToFood={onGoToFood}
          />
        </div>

        {/* ── Frozen Pork ────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I ended the day by buying some frozen pork from a vending machine.
          </p>
        </div>

      </div>
    </div>
  );
}
