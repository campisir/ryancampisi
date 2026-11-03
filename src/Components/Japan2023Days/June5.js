import React from 'react';
import Journal from './designs/Journal';

const VIDEO_URLS = {
  pitch: 'https://dl.dropboxusercontent.com/scl/fi/d7nl9hmrs3v70ybiqyndz/commanderantichess.mp4?rlkey=omtd2g26v0s5j59h0b27tzba0&st=ih34e0od&dl=0',
};

export default function June5(props) {
  const story = {
    title: 'Cross Cultural Design',
    recap: ['The first day of classes', 'Another MaiMai run', 'A rejected pitch', 'A ramen vending machine'],
    blocks: [
      {
        type: 'p',
        text: "I attended my first ever class. It was Cross Cultural Design. The class was held outside by the Kamo River. I woke up not realizing that there was a mandatory class reading. I skimmed through it and ended up clutching a 100% on the quiz. I'm just built like that.",
      },

      { type: 'break' },

      {
        type: 'p',
        text: 'Afterwards, I went back to Round 1 to play MaiMai again. In my head, I imagined myself being a god at the game by the end of the trip if I kept practicing (spoiler alert: didn\'t happen).',
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/06cgk1kcc2v3nu853swwm/june5_maimai_NOTMINE.jpg?rlkey=6i68qgwr9lkt086tgtnxiungt&st=wt89f51q&dl=0',
          alt: 'Maimai machines',
          caption: (
            <>
              Maimai machines. (Not my image &mdash;{' '}
              <a
                className="jp-story-food-link"
                href="https://commons.wikimedia.org/wiki/File:Maimai_pink.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Commons
              </a>)
            </>
          ),
        }],
      },

      { type: 'break' },

      {
        type: 'p',
        text: 'I received word from my professor that my pitch revision for my PfP idea was rejected. Basically, he said I was too dumb to code a competent chess engine. RIP Commander Antichess.',
      },
      { type: 'video', src: VIDEO_URLS.pitch, caption: 'The pitch I made for Commander Antichess.' },

      { type: 'break' },

      {
        type: 'p',
        text: 'I ate an all-in-one ramen bowl from Kunton Akutagawa. This was my first time using one of those ramen vending machines where it outputs a ticket. The lady at the front had to show me how to do it.',
      },
      {
        type: 'food',
        src: 'https://dl.dropboxusercontent.com/scl/fi/7p36zzf1p2a1xj6998nha/june5_dinner.jpg?rlkey=5shibe8hegjpb1y9ib5tqkfz6&st=04jeoh43&dl=0',
        alt: 'My all-in-one ramen bowl',
        caption: 'My all-in-one ramen bowl',
        locationUrl: 'https://maps.app.goo.gl/yVNLrL9BRoPeCVPH6',
        locationName: 'Kunton Akutagawa',
        about: 'I determined this location because I took a picture of the outside of the establishment.',
      },
      {
        type: 'p',
        text: 'When I arrived back at my room around 9:30pm, my roommate and his friends were playing on one of his wiis from his 900 yen wii collection.',
      },
    ],
  };

  return <Journal {...props} onNext={props.onNextDay} story={story} />;
}
