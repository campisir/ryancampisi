import React from 'react';
import { imgSlot, withCaption, chapterBreak } from './storyHelpers';

const VIDEO_URLS = {
  rainWalk: 'https://dl.dropboxusercontent.com/scl/fi/5ssj3pyyu9nafzaeuo99y/june2_rainwalk.MOV?rlkey=6qpigou69menitvbym9xjlkp7&st=6is31an5&dl=0',
  selfieVid:'https://dl.dropboxusercontent.com/scl/fi/rdu3ywfxxxb76hhxt08yd/june2_selfievid.MOV?rlkey=d53jkwmfdfiai6rh4gcqwg54k&st=84pu96ks&dl=0',
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

export default function June2({ date, dayNum, tripLength, onBack, onShowRule }) {
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
        <span className="jp-story-intro-tag">Rainy Day</span>
        <h3 className="jp-story-intro-title">A Rainy Day in Kyoto</h3>
        <p className="jp-story-intro-desc">
          Rain, a return to McDonald&#39;s, and stumbling upon Teramachi Street.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── Rain Walk ──────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            It was a rainy day in Kyoto. I walked around taking pictures and videos for a
            while.
          </p>
          {embeddedVideo(VIDEO_URLS.rainWalk, 'Walking around on a rainy day in Kyoto.')}
          {embeddedVideo(VIDEO_URLS.selfieVid, 'Me, walking around in Kyoto National Garden in the rain.')}
        </div>

        {/* ── McDonald's ─────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Then, I went back to the same McDonald&#39;s that I visited yesterday to eat.
            This did not violate{' '}
            <button
              className="jp-rule-inline"
              onClick={() => onShowRule('rule2')}
            >
              Rule 2
            </button>
            {' '}since I did not eat there when I first visited. This is one of three days on
            the trip where I wrote down what I ate but did not take a picture of it.
          </p>
        </div>

        {/* ══ TERAMACHI ════════════════════════════ */}
        {chapterBreak('TERAMACHI', 'teramachi')}

        {/* ── Solo Exploring ─────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Afterwards, I did some more solo exploring around Kyoto. I stumbled across an
            area that I noted as &#34;a mall-type area with a lot of stores and
            foreigners.&#34; This was Kyoto&#39;s Teramachi street. This would become an
            area I would visit very frequently throughout the trip as it was a reasonable
            walk south from Stay Sakura Gyoen East.
          </p>
          {withCaption(
            imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/f2tnu1f0jp4zxfwnd1ylm/june2_map.png?rlkey=1brwbm8wmfzbzmucpz5x2fi63&st=mki06t6i&dl=0', 'A screenshot of my location in relation to Stay Sakura'),
            'A screenshot I took of my location in relation to Stay Sakura so I could remember how to get back to Teramachi.'
          )}
          {withCaption(
            imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/t505zlsk2pfwxghe8rt8j/june2_movieposters.jpg?rlkey=zfymmgquzsmzpe17zaoztpzs6&st=97r2mh26&dl=0', 'The movie posters outside of MOVIX in Teramachi'),
            'The movie posters outside of MOVIX in Teramachi.'
          )}
        </div>

        {/* ── First 7/11 Purchase ────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I made a purchase from a Japanese 7/11 for the first time. I did not note what
            I purchased, but it was likely some sort of snack.
          </p>
        </div>

      </div>
    </div>
  );
}
