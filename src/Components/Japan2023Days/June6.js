import React from 'react';
import { imgSlot, withCaption, chapterBreak, FoodEntry } from './storyHelpers';

export default function June6({ date, dayNum, tripLength, onBack, onGoToFood, onGoToWeatherViz }) {
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
        <span className="jp-story-intro-tag">First Coding Class</span>
        <h3 className="jp-story-intro-title">Performant Python Programming</h3>
        <p className="jp-story-intro-desc">
          The first coding class, a 7/11 run, anime figurines in Teramachi, and a
          Wendy&#39;s teriyaki sandwich.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── Performant Python Programming ──────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I attended my first Performant Python Programming class. We formed groups for our
            semester long coding project.
          </p>
          <p className="jp-story-prose">
            The professor said we could join an approved project OR join his personal project
            related to some sort of &#34;Test Suite&#34; for instructors. I briefly considered
            joining the professor&#39;s project but decided against it because the concept
            seemed pretty boring. That was one of my best decisions because that project ended
            up being a disaster lmao. I joined a group with two other people for{' '}
            <button
              className="jp-story-food-link"
              onClick={onGoToWeatherViz}
            >
              WeatherViz
            </button>
            {', '}a visualization of historical weather data. Later, two other people joined,
            bringing our total members to five.
          </p>
          {withCaption(
            imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/dky0i0z8ln55pwgrc46d3/june6_pfplocation.png?rlkey=uf51ab1bqoqjgs81n5117s0nz&st=lavw8n1t&dl=0', 'A screenshot of the location of our Performant Python Programming classroom'),
            <>A screenshot I took of the location of our Performant Python Programming classroom.{' '}<a className="jp-story-food-link" href="https://maps.app.goo.gl/syXXnCHpeATYjBcX9" target="_blank" rel="noopener noreferrer">View on Google Maps</a></>
          )}
        </div>

        {/* ── 7/11 ───────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            After class, I bought some food from 7/11 (rice and meat). It was alright.
          </p>
          {withCaption(
            imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/obrpks2sjx8ej2pjkxw7x/june6_711.png?rlkey=25xyrmrperazvit8xg7ejytbz&st=gpt0zyqe&dl=0', 'The 7/11 our class would go to after Performant Python Programming'),
            <>The 7/11 that our class would frequently go to as a group after Performant Python Programming. This image is not mine, and is instead the default image on Google Maps.{' '}<a className="jp-story-food-link" href="https://maps.app.goo.gl/RkCvpevZGb3589on6" target="_blank" rel="noopener noreferrer">View on Google Maps</a></>
          )}
        </div>

        {/* ══ TERAMACHI ════════════════════════════ */}
        {chapterBreak('TERAMACHI', 'teramachi')}

        {/* ── Anime Figurines ────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I headed back to the Teramachi area and bought some anime figurines for my younger
            brothers. I bought a Zoro figurine and a Todoroki figurine.
          </p>
          <div className="jp-story-img-grid jp-story-img-grid-2">
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('')}
              <p className="jp-story-caption">Zoro figurine.</p>
            </div>
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('')}
              <p className="jp-story-caption">Todoroki figurine.</p>
            </div>
          </div>
        </div>

        {/* ══ DINNER ════════════════════════════════ */}
        {chapterBreak('DINNER', 'dinner')}

        {/* ── Wendy's ────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I ate some sort of Teriyaki sandwich from Wendy&#39;s in Teramachi. I sat on the
            2nd floor of Wendy&#39;s for a few hours working on a coding assignment for PfP.
            I did not finish the assignment.
          </p>
          <FoodEntry
            src="https://dl.dropboxusercontent.com/scl/fi/bi5pqkpygg9srpdos3lmj/june6_dinner.jpg?rlkey=it2hkixcwmg4rhwm3pviz1zpb&st=yg01dgur&dl=0"
            alt="My meal from Wendy's"
            caption="My meal from Wendy's"
            locationUrl="https://maps.app.goo.gl/A3Bp9Xq4L8mZrMkS9"
            locationName="Wendy's"
            about="I determined this location because I specifically wrote down it was Wendy's and the Wendy's branding was clear from the picture. I also had a credit card statement for the specific location."
            onGoToFood={onGoToFood}
          />
        </div>

      </div>
    </div>
  );
}
