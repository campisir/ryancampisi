import React from 'react';
import Journal from './designs/Journal';

export default function June6(props) {
  const { onGoToWeatherViz } = props;

  const story = {
    title: 'Performant Python Programming',
    recap: ['The first coding class', 'A 7/11 run', 'Anime figurines in Teramachi', "A Wendy's teriyaki sandwich"],
    blocks: [
      {
        type: 'p',
        text: 'I attended my first Performant Python Programming class. We formed groups for our semester long coding project.',
      },
      {
        type: 'p',
        text: (
          <>
            The professor said we could join an approved project OR join his personal project
            related to some sort of &quot;Test Suite&quot; for instructors. I briefly considered
            joining the professor&apos;s project but decided against it because the concept
            seemed pretty boring. That was one of my best decisions because that project ended
            up being a disaster lmao. I joined a group with two other people for{' '}
            <button className="jp-story-food-link" onClick={onGoToWeatherViz}>
              WeatherViz
            </button>
            {', '}a visualization of historical weather data. Later, two other people joined,
            bringing our total members to five.
          </>
        ),
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/dky0i0z8ln55pwgrc46d3/june6_pfplocation.png?rlkey=uf51ab1bqoqjgs81n5117s0nz&st=lavw8n1t&dl=0',
          alt: 'A screenshot of the location of our Performant Python Programming classroom',
          caption: (
            <>
              A screenshot I took of the location of our Performant Python Programming classroom.{' '}
              <a
                className="jp-story-food-link"
                href="https://maps.app.goo.gl/syXXnCHpeATYjBcX9"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </>
          ),
        }],
      },
      { type: 'p', text: 'After class, I bought some food from 7/11 (rice and meat). It was alright.' },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/obrpks2sjx8ej2pjkxw7x/june6_711.png?rlkey=25xyrmrperazvit8xg7ejytbz&st=gpt0zyqe&dl=0',
          alt: 'The 7/11 our class would go to after Performant Python Programming',
          caption: (
            <>
              The 7/11 that our class would frequently go to as a group after Performant Python
              Programming. This image is not mine, and is instead the default image on Google Maps.{' '}
              <a
                className="jp-story-food-link"
                href="https://maps.app.goo.gl/RkCvpevZGb3589on6"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </>
          ),
        }],
      },

      { type: 'break' },

      {
        type: 'p',
        text: 'I headed back to the Teramachi area and bought some anime figurines for my younger brothers. I bought a Zoro figurine and a Todoroki figurine.',
      },
      {
        type: 'photos',
        items: [
          { alt: 'Zoro figurine', caption: 'Zoro figurine.' },
          { alt: 'Todoroki figurine', caption: 'Todoroki figurine.' },
        ],
      },

      { type: 'break' },

      {
        type: 'p',
        text: "I ate some sort of Teriyaki sandwich from Wendy's in Teramachi. I sat on the 2nd floor of Wendy's for a few hours working on a coding assignment for PfP. I did not finish the assignment.",
      },
      {
        type: 'food',
        src: 'https://dl.dropboxusercontent.com/scl/fi/bi5pqkpygg9srpdos3lmj/june6_dinner.jpg?rlkey=it2hkixcwmg4rhwm3pviz1zpb&st=yg01dgur&dl=0',
        alt: "My meal from Wendy's",
        caption: "My meal from Wendy's",
        locationUrl: 'https://maps.app.goo.gl/A3Bp9Xq4L8mZrMkS9',
        locationName: "Wendy's",
        about: "I determined this location because I specifically wrote down it was Wendy's and the Wendy's branding was clear from the picture. I also had a credit card statement for the specific location.",
      },
    ],
  };

  return <Journal {...props} onNext={props.onNextDay} story={story} />;
}
