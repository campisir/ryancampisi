import React from 'react';
import { imgSlot, withCaption, chapterBreak } from './storyHelpers';

const VIDEO_URLS = {
  japanTv:     'https://dl.dropboxusercontent.com/scl/fi/zv6sqvchzxf21e423fekn/june1_japantv.mov?rlkey=g4wt17fwrtg2clpkwc9ayfs8f&st=ihjcjayy&dl=0',
  groupWalking:'https://dl.dropboxusercontent.com/scl/fi/11y6g25ye1ruzrttilfer/june1_groupwalking.mov?rlkey=k4u708du1o46qezr5fqc9ra34&st=q8fwfn8q&dl=0',
  gardenVid:   'https://dl.dropboxusercontent.com/scl/fi/0i99wod4mvoj3ofi30zj3/june1_gardenvid.MOV?rlkey=bbkivqubofqgn2nykl2uf3zue&st=bmjlp0ln&dl=0',
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

export default function June1({ date, dayNum, tripLength, onBack, onGoToDay }) {
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
        <span className="jp-story-intro-tag">First Full Day</span>
        <h3 className="jp-story-intro-title">Exploring Kyoto</h3>
        <p className="jp-story-intro-desc">
          The first full day in Japan &#8212; a morning walk through Kyoto Gyoen, a group
          excursion around Kyoto, and the day I rediscovered my free will.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── Waking Up in Japan ─────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Bro... we&#39;re lowk in Japan. 😳
          </p>
          {embeddedVideo(VIDEO_URLS.japanTv, 'Japanese broadcast in my room in Stay Sakura.')}
        </div>

        {/* ── Morning Walk & SIM Card ────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I recall taking a walk through the nearby Kyoto Gyoen National Garden early in
            the morning with my roommate and one other student. The garden was essentially
            a five minute walk from Stay Sakura, so I would return to it countless times
            throughout the trip.
          </p>
          <p className="jp-story-prose">
            I met my professor for the first time in person when I went to get my SIM card.
          </p>
        </div>

        {/* ══ EXPLORING KYOTO ══════════════════════ */}
        {chapterBreak('EXPLORING KYOTO', 'exploring')}

        {/* ── Group Exploration ──────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Afterwards, the students began to disperse in groups to explore Kyoto. I decided
            to tag along with the largest group. We started off by walking to 7/11 so people
            could withdraw money or buy snacks. I did not get anything. Then, we went to the
            Kyoto Manga Museum. I did not go inside, however, I did go back to go inside on{' '}
            <button
              className="jp-story-food-link"
              onClick={() => onGoToDay && onGoToDay('2023-07-29')}
            >
              July 29th
            </button>.
            Only a few people went inside while the rest of us waited outside for them to
            finish. After the group reconvened outside of the manga museum, we made our way
            to McDonald&#39;s.
          </p>
          {embeddedVideo(VIDEO_URLS.groupWalking, 'Our group walking through Kyoto.')}
        </div>

        {/* ══ FREE WILL ════════════════════════════ */}
        {chapterBreak('FREE WILL', 'freewill')}

        {/* ── Back to the Garden ─────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            It was at this moment, as I was waiting for members of the group to order their
            McDonald&#39;s, that I finally remembered that I have free will. So, I left. I
            went back to Kyoto Gyoen National Garden to take pictures/videos.
          </p>
          {withCaption(
            imgSlot('jp-story-img-wide', 'https://dl.dropboxusercontent.com/scl/fi/6x3p1b7k91qkx8722vxq9/june1_gardenpic.JPG?rlkey=42oglgcfoqrj8rx5bzd2e9r7u&st=j85llrdz&dl=0', 'A picture I took in Kyoto Gyoen National Garden'),
            'A picture I took in Kyoto Gyoen National Garden.'
          )}
          {embeddedVideo(VIDEO_URLS.gardenVid, "The first photo/video I took with my Nikon in Japan. It's inside Kyoto Gyoen National Garden. You can hear me chewing gum like a chud.")}
        </div>

        {/* ══ WELCOME DINNER ═══════════════════════ */}
        {chapterBreak('WELCOME DINNER', 'dinner')}

        {/* ── Zoronpa ────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            May 31st and June 1st are the only days in the entire trip in which I did not
            write down what I ate for dinner AND I did not take a picture of it. However, if
            my memory is correct, this was the day that we had our &#34;Welcome Dinner.&#34;
            It was held at{' '}
            <a
              className="jp-story-food-link"
              href="https://maps.app.goo.gl/FMMVqyAbV3jduAju8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zoronpa
            </a>.
          </p>
        </div>

      </div>
    </div>
  );
}
