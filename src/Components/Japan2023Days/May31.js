import React from 'react';
import { imgSlot, withCaption, chapterBreak } from './storyHelpers';

const VIDEO_URLS = {
  planeseat:        'https://dl.dropboxusercontent.com/scl/fi/4n9d63e6ue78oz4sojgjb/may31_planeseat.mov?rlkey=i6009f1k8cfe2cofh5guxaq26&st=am7071f2&dl=0',
  hellokittyOutside:'https://dl.dropboxusercontent.com/scl/fi/ruof786mxwerpkfceu1l8/may31_hellokittyoutside.mov?rlkey=pew2nm20oq4frjwg17ptm27f5&st=0oqnji39&dl=0',
  roomTour:         'https://dl.dropboxusercontent.com/scl/fi/wzeqktnhq0hc1n9lsw26c/may31_mtvmycrib.mov?rlkey=dk6u19gtxamq5o3lpbn0brvio&st=py8lp2ul&dl=0',
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

export default function May31({ date, dayNum, tripLength, onBack }) {
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
        <span className="jp-story-intro-tag">Arrival Day</span>
        <h3 className="jp-story-intro-title">Flight to Japan</h3>
        <p className="jp-story-intro-desc">
          The day it all started &#8212; a flight from SFO to Kansai International
          Airport, a confusing run-in with immigration, and a ride on the Hello Kitty
          Express.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── The Flight ─────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            The flight to Japan was alright. I don&#39;t really have a problem with long
            plane rides like a lot of people do. One other member of the abroad program
            was on the same flight. I flew into Kansai International Airport.
          </p>
          {embeddedVideo(VIDEO_URLS.planeseat, "The seat display showing my flight's route from SFO to KIX.")}
        </div>

        {/* ── Plane Food ─────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Here&#39;s what I ate on the plane.
          </p>
          <div className="jp-story-img-grid jp-story-img-grid-2">
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/rrdej724e50itmdp7ysl5/may31_planedinner.jpg?rlkey=yx774pra0ke8zzoxqzd8eyc9c&st=2sjjsrj7&dl=0', 'The first meal I was served on the flight (dinner)')}
              <p className="jp-story-caption">The first meal I was served on the flight (dinner).</p>
            </div>
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/kympe32gqak8wmgigcel3/may31_planebreakfast.jpg?rlkey=wk0hfx26mitynp40e9nj5ho03&st=9fncwdqp&dl=0', 'The second meal I was served on the flight (breakfast)')}
              <p className="jp-story-caption">The second meal I was served on the flight (breakfast).</p>
            </div>
          </div>
        </div>

        {/* ══ ARRIVAL ══════════════════════════════ */}
        {chapterBreak('ARRIVAL', 'arrival')}

        {/* ── Immigration ────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            When I was going through immigration, I specifically remember having trouble
            explaining the reason for my stay. I was trying to explain that I was here for
            study but I was staying at a hostel and it confused him. He said something like
            &#34;I don&#39;t understand how you speak&#34; haha.
          </p>
        </div>

        {/* ── Lost Wallet ────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            Once I got to the exit of the airport, I met back up with the other guy who was
            on my flight who was also in the program. Soon after meeting, he realized that
            he lost his wallet. That really sucked for him. I never found out if he got that
            resolved.
          </p>
        </div>

        {/* ══ HELLO KITTY EXPRESS ══════════════════ */}
        {chapterBreak('HELLO KITTY EXPRESS', 'hellokitty')}

        {/* ── The Train ──────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Hello Kitty Express</h4>
          </div>
          <p className="jp-story-prose">
            We had arrived earlier than most other flights. So, we had two options: wait at
            the airport for everybody else to arrive (many hours) OR dip out to where we
            were staying on our own. We decided to dip out on the Hello Kitty Express.
          </p>
          {embeddedVideo(VIDEO_URLS.hellokittyOutside, 'The Hello Kitty Express from the outside.')}
          {withCaption(
            imgSlot('jp-story-img-wide', 'https://dl.dropboxusercontent.com/scl/fi/98whbd8yo5sp0gux2qniw/may31_hellokittyinside.jpg?rlkey=jgc73myjm0op12n0vsd3r9xq8&st=46zsfamr&dl=0', 'Inside the Hello Kitty Express'),
            'W Hello Kitty.'
          )}
        </div>

        {/* ── Ticket Story ───────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I didn&#39;t realize how the ticket system worked. So, I didn&#39;t keep track
            of my ticket after getting on the train. When we had to exit the station, I did
            not have my ticket on hand to exit. I had to explain to an employee that
            I&#39;m dumb and didn&#39;t know. He realized repaying would be expensive and
            he let me go through but said to be more careful in the future. Shout out to bro
            for that one. I ended up finding the ticket in my wallet on a future date.
          </p>
        </div>

        {/* ══ STAY SAKURA ══════════════════════════ */}
        {chapterBreak('STAY SAKURA', 'sakura')}

        {/* ── Room Tour ──────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Stay Sakura Gyoen East</h4>
          </div>
          <p className="jp-story-prose">
            We arrived at where we would be staying for the entire program, Stay Sakura
            Gyoen East. My roommate had not yet arrived. Here is the full room tour.
          </p>
          {embeddedVideo(VIDEO_URLS.roomTour, 'A tour of my room at Stay Sakura.')}
        </div>

      </div>
    </div>
  );
}
