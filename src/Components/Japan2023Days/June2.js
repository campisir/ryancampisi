import React from 'react';
import Journal from './designs/Journal';

const VIDEO_URLS = {
  rainWalk: 'https://dl.dropboxusercontent.com/scl/fi/5ssj3pyyu9nafzaeuo99y/june2_rainwalk.MOV?rlkey=6qpigou69menitvbym9xjlkp7&st=6is31an5&dl=0',
  selfieVid:'https://dl.dropboxusercontent.com/scl/fi/rdu3ywfxxxb76hhxt08yd/june2_selfievid.MOV?rlkey=d53jkwmfdfiai6rh4gcqwg54k&st=84pu96ks&dl=0',
};

export default function June2(props) {
  const { onShowRule } = props;

  const story = {
    title: 'A Rainy Day in Kyoto',
    recap: ['A rainy walk', "A return to McDonald's", 'Stumbling upon Teramachi Street', 'My first 7/11 purchase'],
    blocks: [
      {
        type: 'p',
        text: 'It was a rainy day in Kyoto. I walked around taking pictures and videos for a while.',
      },
      { type: 'video', src: VIDEO_URLS.rainWalk, caption: 'Walking around on a rainy day in Kyoto.' },
      { type: 'video', src: VIDEO_URLS.selfieVid, caption: 'Me, walking around in Kyoto National Garden in the rain.' },
      {
        type: 'p',
        text: (
          <>
            Then, I went back to the same McDonald's that I visited yesterday to eat.
            This did not violate{' '}
            <button className="jp-rule-inline" onClick={() => onShowRule('rule2')}>
              Rule 2
            </button>
            {' '}since I did not eat there when I first visited. This is one of three days on
            the trip where I wrote down what I ate but did not take a picture of it.
          </>
        ),
      },

      { type: 'break' },

      {
        type: 'p',
        text: 'Afterwards, I did some more solo exploring around Kyoto. I stumbled across an area that I noted as "a mall-type area with a lot of stores and foreigners." This was Kyoto\'s Teramachi street. This would become an area I would visit very frequently throughout the trip as it was a reasonable walk south from Stay Sakura Gyoen East.',
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/f2tnu1f0jp4zxfwnd1ylm/june2_map.png?rlkey=1brwbm8wmfzbzmucpz5x2fi63&st=mki06t6i&dl=0',
          alt: 'A screenshot of my location in relation to Stay Sakura',
          caption: 'A screenshot I took of my location in relation to Stay Sakura so I could remember how to get back to Teramachi.',
        }],
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/t505zlsk2pfwxghe8rt8j/june2_movieposters.jpg?rlkey=zfymmgquzsmzpe17zaoztpzs6&st=97r2mh26&dl=0',
          alt: 'The movie posters outside of MOVIX in Teramachi',
          caption: 'The movie posters outside of MOVIX in Teramachi.',
        }],
      },
      {
        type: 'p',
        text: 'I made a purchase from a Japanese 7/11 for the first time. I did not note what I purchased, but it was likely some sort of snack.',
      },
    ],
  };

  return <Journal {...props} onNext={props.onNextDay} story={story} />;
}
