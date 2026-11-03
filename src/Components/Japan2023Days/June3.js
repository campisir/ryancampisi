import React from 'react';
import Journal from './designs/Journal';

const VIDEO_URLS = {
  kamo:   'https://dl.dropboxusercontent.com/scl/fi/a6n164p2qz2p047w5tjjp/june3_kamo.mov?rlkey=d78eon4oliaur8s9ze3g1xold&st=mode8ua2&dl=0',
  kamo2:  'https://dl.dropboxusercontent.com/scl/fi/bieg8pgten1hy716nbbga/june3_kamo2.MOV?rlkey=2xzz0yudaog53cw4ogpvr2dcl&st=zensxkti&dl=0',
  round1: 'https://dl.dropboxusercontent.com/scl/fi/i134izpkio5cpd8b6jdmk/june3_round1.mov?rlkey=f5awspdptni92iz1nt87ugc5j&st=pl61qa4h&dl=0',
};

export default function June3(props) {
  const { onShowRule } = props;

  const story = {
    title: 'Kamo River & Round 1',
    recap: ['A Ghibli-esque walk along the Kamo River', 'The Round 1 arcade', 'Bookoff', 'Curry ramen at Nandattei'],
    blocks: [
      {
        type: 'p',
        text: "I spent most of the day walking up and down the Kamo River. Watching the people sit along the river and people bike along the sides felt like I was in a Ghibli movie. It's such a beautiful area.",
      },
      { type: 'video', src: VIDEO_URLS.kamo, caption: 'A view by the Kamo River.' },
      { type: 'video', src: VIDEO_URLS.kamo2, caption: 'Walking beside the Kamo River.' },

      { type: 'break' },

      {
        type: 'p',
        text: (
          <>
            I saw people talking about &quot;Round 1&quot; in the Teams chat. By{' '}
            <button className="jp-rule-inline" onClick={() => onShowRule('rule1')}>
              Rule 1
            </button>
            {', '}I decided to visit it. It was a nice arcade. I tried out the popular
            &quot;MaiMai&quot; game. It was fun, but I was obviously very weak compared to the
            sweaty Japanese teenagers playing around me. You knew they were serious about the
            game when they pulled out special gloves lol.
          </>
        ),
      },
      { type: 'video', src: VIDEO_URLS.round1, caption: 'Walking around one of the floors of Round 1.' },

      { type: 'break' },

      {
        type: 'p',
        text: 'My roommate shared with the class that he bought a bunch of cheap Wiis from "Bookoff." I decided to check it out for myself. I visited Bookoff for the first time but did not buy anything.',
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/7nw45jl3zxmx4ammj78f8/june3_900yenwii.jpg?rlkey=8oywrfjna583jtp6we71y0ar8&st=smjm2t6w&dl=0',
          alt: 'One of the Wiis sold at Bookoff for 900 yen',
          caption: 'One of the wiis sold at Bookoff for 900 yen. My roommate bought a bunch of these.',
        }],
      },

      { type: 'break' },

      {
        type: 'p',
        text: 'I ate curry ramen from Nandattei. This was my first time ordering from a Japanese restaurant by myself (unless you count McDonald\'s lol). I was quite nervous but the "point at the menu" method is lowk OP.',
      },
      {
        type: 'food',
        src: 'https://dl.dropboxusercontent.com/scl/fi/fsz3vqf2gtra3uisfz8pa/june3_dinner.jpg?rlkey=80jryfnwy1hkmcc3qqxleke78&st=aafnvxmg&dl=0',
        alt: 'Curry ramen',
        caption: 'Curry ramen',
        locationUrl: 'https://maps.app.goo.gl/TyZW16JDMLasS1TGA',
        locationName: 'Nandattei',
        about: 'I determined the location for this one because I specifically wrote down the name “Nandattei” in my notes.',
      },
      { type: 'p', text: 'I ended the day by buying some frozen pork from a vending machine.' },
    ],
  };

  return <Journal {...props} onNext={props.onNextDay} story={story} />;
}
