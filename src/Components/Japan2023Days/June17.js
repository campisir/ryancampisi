import React from 'react';
import Journal from './designs/Journal';

/* June 17, 2023: Mount Hiei hike. */
export default function June17(props) {
  const { onGoToFood, onShowRule } = props;

  const story = {
    title: 'Mount Hiei Hike',
    recap: ['Nyannyan-ji, the cat temple', 'Lunch at Yase Heihachi', 'The tram and the lookout', 'The highest point', 'Tragedy strikes', 'Bro gets airlifted out', 'Dinner at Salman & Sohel Halal Kitchen'],
    blocks: [
      {
        type: 'p',
        text: (
          <>
            Another student on the program posted in the class Teams chat that he was
            planning on hiking Mount Hiei. I reached out to join him (see{' '}
            <button className="jp-rule-inline" onClick={() => onShowRule('rule1')}>
              Rule 1
            </button>
            ).
          </>
        ),
      },
      {
        type: 'p',
        text: 'There were five of us in the group. We started out by traveling to Nyannyan-ji (basically a cat temple). Japan really loves their cats.',
      },
      {
        type: 'photos',
        items: [1, 2, 3, 4].map((n) => ({
          src: `/jun17temp/catshrine${n}.jpeg`,
          alt: 'Nyannyan-ji cat shrine',
        })),
      },
      { type: 'p', text: 'We then ate at Yase Heihachi. I got Tofu Udon.' },
      {
        type: 'photos',
        items: [{
          alt: 'Tofu Udon',
          caption: (
            <>
              Tofu Udon. See also:{' '}
              <button className="jp-story-food-link" onClick={onGoToFood}>Food</button>
            </>
          ),
        }],
      },
      { type: 'p', text: 'Next, we took some tram cars up to this lookout point.' },
      {
        type: 'photos',
        items: [
          { src: '/jun17temp/lookoutpoint1.jpeg', alt: 'Lookout point view from Mount Hiei' },
          { src: '/jun17temp/lookoutpoint2.png',  alt: 'Lookout point view from Mount Hiei' },
          { src: '/jun17temp/lookoutpoint3.jpeg', alt: 'Lookout point view from Mount Hiei' },
          { src: '/jun17temp/lookoutpoint4.png',  alt: 'Lookout point view from Mount Hiei' },
        ],
      },
      {
        type: 'p',
        text: 'One of the other four decided to leave at this point. The remaining four of us hiked to the highest point of Mount Hiei.',
      },
      {
        type: 'photos',
        items: [{
          src: '/jun17temp/summitsign.jpeg',
          alt: 'The sign at the highest point of Mount Hiei',
          caption: 'The sign at the highest point of Mount Hiei.',
        }],
      },
      {
        type: 'p',
        text: "We then decided to do some more hiking. My memory says that we had a destination in mind (some sort of overlook idk) but looking at the coordinates we ended up at, I genuinely can't figure out where on earth we were going.",
      },
      {
        type: 'photos',
        items: [
          {
            src: '/jun17temp/askingfordirections.jpeg',
            alt: 'One of the guys asking a Japanese couple for directions',
            caption: 'One of the guys asking for directions.',
          },
          {
            src: '/jun17temp/hiking.jpeg',
            alt: 'The group hiking on Mount Hiei',
            caption: 'Did we know where we were going? Who knows. What I do know is that this picture has good album cover potential.',
          },
        ],
      },

      { type: 'break' },

      {
        type: 'p',
        text: 'One of the other three guys injured his ankle. He was unable to continue walking, so we called for help.',
      },
      { type: 'video', caption: 'One of the other guys calling for assistance.' },
      {
        type: 'location',
        coords: '35.10837\u00B0 N, 135.840372\u00B0 E',
        note: 'Map visualization coming soon \u00B7 Mount Hiei',
        caption: 'Where we called for help.',
      },

      { type: 'break' },

      {
        type: 'video',
        caption: 'A helicopter picking him up. It felt like I was in a hurricane simulator. If you look at the top left, you can see him getting lifted up.',
      },
      {
        type: 'p',
        text: "The remaining three of us then got escorted down the mountain by these Japanese guys (I'm assuming because it was getting dark). We walked for like an hour.",
      },
      { type: 'video', caption: 'Walking down the mountain.' },
      {
        type: 'p',
        text: 'We finally reached civilization. We gave our info to some guys at a station and then some guy on a scooter escorted us to the bus stop.',
      },
      { type: 'video', caption: 'A man on a scooter escorting us to the bus stop.' },
      {
        type: 'p',
        text: 'After we arrived back in Kyoto, I ate dinner with the same two guys from the hike and later a third person from the program joined us.',
      },
      {
        type: 'photos',
        items: [{
          alt: 'Indian curry, naan, and salad',
          caption: (
            <>
              Salman &amp; Sohel Halal Kitchen Kyoto: Indian curry, naan, and salad.{' '}
              <button className="jp-rule-inline" onClick={() => onShowRule('rule2')}>
                Rule 2
              </button>
              {' '}approved. See also:{' '}
              <button className="jp-story-food-link" onClick={onGoToFood}>Food</button>
            </>
          ),
        }],
      },
    ],
  };

  return <Journal {...props} onNext={props.onNextDay} story={story} />;
}
