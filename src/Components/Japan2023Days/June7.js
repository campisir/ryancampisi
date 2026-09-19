import React from 'react';
import { chapterBreak, FoodEntry, MapEmbed } from './storyHelpers';

const VIDEO_URLS = {
  sunset: 'https://dl.dropboxusercontent.com/scl/fi/y4beb2zz35y5hcwbd771u/june7_sunset.MOV?rlkey=uppmrjot9vb48si6llnuvr41f&st=9xpqw07p&dl=0',
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

export default function June7({ date, dayNum, tripLength, onBack, onGoToFood }) {
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
        <span className="jp-story-intro-tag">Class &amp; Study Spots</span>
        <h3 className="jp-story-intro-title">CCD, Koe Donuts &amp; Sunset</h3>
        <p className="jp-story-intro-desc">
          A class quiz, an ill-fated run with the professor, donuts, a pork sandwich, and a
          Kamo River sunset.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── CCD ────────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I attended CCD. I noted that I got one question wrong on the class quiz because
            the question was &#34;BS.&#34; I do not recall what the question was so I cannot
            conclude whether I was being dramatic or not.
          </p>
        </div>

        {/* ── Running ────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            The professor would often go running alongside the river after class. I
            haven&#39;t ran since I was a kid, so my brain seemed to think that it would be
            easy. I told the professor that I would run with him. Me, the professor, and one
            other student started running. I quickly realized that I&#39;m an unc now and
            running is lowk hard af. I dropped out after a few minutes.
          </p>
        </div>

        {/* ══ KOE DONUTS ═══════════════════════════ */}
        {chapterBreak('KOE DONUTS', 'koe')}

        {/* ── Koe Donuts ─────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I finished most of my PfP coding assignment while sitting in Koe Donuts in
            Teramachi. This was my first time at Koe Donuts and it would become one of my
            favorite spots to work on assignments.
          </p>
          <MapEmbed
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.51175345126427!2d135.767227!3d35.004351299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600109aa6c8f4341%3A0xeecb27de020ad3d7!2sko%C3%A9%20donuts%20kyoto!5e0!3m2!1sen!2sus!4v1789840235988!5m2!1sen!2sus"
            title="Koé Donuts Kyoto"
          />
        </div>

        {/* ══ DINNER ════════════════════════════════ */}
        {chapterBreak('DINNER', 'dinner')}

        {/* ── Bunk Sandwiches ────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Afterwards, I ate a pork sandwich from Bunk Sandwiches.
          </p>
          <FoodEntry
            src="https://dl.dropboxusercontent.com/scl/fi/22sliudxm9lbwglw4b7vf/june7_dinner.jpg?rlkey=gepduhn1lklhb4wamskr4afbd&st=ia5mmv1f&dl=0"
            alt="My sandwich from Bunk Sandwiches"
            caption="My sandwich from Bunk Sandwiches"
            mapEmbed="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d687.0224871606858!2d135.7676808061108!3d35.00550054711645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600109dbc3f07475%3A0x6b97f98756d0c8bb!2z44OQ44Oz44Kv44K144Oz44OJ44Kk44OD44OB!5e0!3m2!1sen!2sus!4v1789840095462!5m2!1sen!2sus"
            locationName="Bunk Sandwiches"
            about="THIS LOCATION IS PERMANENTLY CLOSED."
            onGoToFood={onGoToFood}
          />
        </div>

        {/* ══ STUDY SPOTS ══════════════════════════ */}
        {chapterBreak('STUDY SPOTS', 'study')}

        {/* ── Ace Hotel ──────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            After that, I began to do some online research on what people considered to be
            the &#34;best study spots in Kyoto&#34; to give myself more options outside of
            Koe Donuts. A recurring one I saw was the hotel lobby of Ace Hotel Kyoto. I
            visited that area and concluded that it was NOT a good study spot and that the
            people online didn&#39;t know what they were talking about. The area around the
            hotel was nice, though.
          </p>
          <MapEmbed
            src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sus!4v1789839932528!5m2!1sen!2sus!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ3Z1djZtQkE.!2m2!1d35.00953830050169!2d135.7600192922091!3f250.64020057897622!4f-2.9446382930367463!5f0.7820865974627469"
            title="Ace Hotel Kyoto"
          />
        </div>

        {/* ── Sunset ─────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Then, I went and sat in the grass by the Kamo River and watched the sun set.
          </p>
          {embeddedVideo(VIDEO_URLS.sunset, 'Sitting by the Kamo River.')}
        </div>

        {/* ── Back at the Room ───────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            When I got back to my room, my roommate and his friends were there working on the
            coding assignment together.
          </p>
        </div>

      </div>
    </div>
  );
}
