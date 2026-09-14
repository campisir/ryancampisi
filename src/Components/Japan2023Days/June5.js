import React from 'react';
import { imgSlot, withCaption, chapterBreak, FoodEntry } from './storyHelpers';

const VIDEO_URLS = {
  pitch: 'https://dl.dropboxusercontent.com/scl/fi/d7nl9hmrs3v70ybiqyndz/commanderantichess.mp4?rlkey=omtd2g26v0s5j59h0b27tzba0&st=ih34e0od&dl=0',
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

export default function June5({ date, dayNum, tripLength, onBack, onGoToFood }) {
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
        <span className="jp-story-intro-tag">First Class</span>
        <h3 className="jp-story-intro-title">Cross Cultural Design</h3>
        <p className="jp-story-intro-desc">
          The first day of classes, another MaiMai run, a rejected pitch, and a ramen
          vending machine.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── First Class ────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I attended my first ever class. It was Cross Cultural Design. The class was held
            outside by the Kamo River. I woke up not realizing that there was a mandatory
            class reading. I skimmed through it and ended up clutching a 100% on the quiz.
            I&#39;m just built like that.
          </p>
        </div>

        {/* ══ ROUND 1 ══════════════════════════════ */}
        {chapterBreak('ROUND 1', 'round1')}

        {/* ── MaiMai Again ───────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Afterwards, I went back to Round 1 to play MaiMai again. In my head, I imagined
            myself being a god at the game by the end of the trip if I kept practicing
            (spoiler alert: didn&#39;t happen).
          </p>
          {withCaption(
            imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/06cgk1kcc2v3nu853swwm/june5_maimai_NOTMINE.jpg?rlkey=6i68qgwr9lkt086tgtnxiungt&st=wt89f51q&dl=0', 'Maimai machines'),
            <>Maimai machines. (Not my image &#8212;{' '}<a className="jp-story-food-link" href="https://commons.wikimedia.org/wiki/File:Maimai_pink.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>)</>
          )}
        </div>

        {/* ══ THE PITCH ════════════════════════════ */}
        {chapterBreak('THE PITCH', 'pitch')}

        {/* ── Commander Antichess ────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I received word from my professor that my pitch revision for my PfP idea was
            rejected. Basically, he said I was too dumb to code a competent chess engine.
            RIP Commander Antichess.
          </p>
          {embeddedVideo(VIDEO_URLS.pitch, 'The pitch I made for Commander Antichess.')}
        </div>

        {/* ══ DINNER ════════════════════════════════ */}
        {chapterBreak('DINNER', 'dinner')}

        {/* ── Ramen Vending Machine ──────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I ate an all-in-one ramen bowl from Kunton Akutagawa. This was my first time
            using one of those ramen vending machines where it outputs a ticket. The lady at
            the front had to show me how to do it.
          </p>
          <FoodEntry
            src="https://dl.dropboxusercontent.com/scl/fi/7p36zzf1p2a1xj6998nha/june5_dinner.jpg?rlkey=5shibe8hegjpb1y9ib5tqkfz6&st=04jeoh43&dl=0"
            alt="My all-in-one ramen bowl"
            caption="My all-in-one ramen bowl"
            locationUrl="https://maps.app.goo.gl/yVNLrL9BRoPeCVPH6"
            locationName="Kunton Akutagawa"
            about="I determined this location because I took a picture of the outside of the establishment."
            onGoToFood={onGoToFood}
          />
        </div>

        {/* ── Back at the Room ───────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            When I arrived back at my room around 9:30pm, my roommate and his friends were
            playing on one of his wiis from his 900 yen wii collection.
          </p>
        </div>

      </div>
    </div>
  );
}
