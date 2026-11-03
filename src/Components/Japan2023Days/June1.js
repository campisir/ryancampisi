import React from 'react';
import Journal from './designs/Journal';

const VIDEO_URLS = {
  japanTv:     'https://dl.dropboxusercontent.com/scl/fi/zv6sqvchzxf21e423fekn/june1_japantv.mov?rlkey=g4wt17fwrtg2clpkwc9ayfs8f&st=ihjcjayy&dl=0',
  groupWalking:'https://dl.dropboxusercontent.com/scl/fi/11y6g25ye1ruzrttilfer/june1_groupwalking.mov?rlkey=k4u708du1o46qezr5fqc9ra34&st=q8fwfn8q&dl=0',
  gardenVid:   'https://dl.dropboxusercontent.com/scl/fi/0i99wod4mvoj3ofi30zj3/june1_gardenvid.MOV?rlkey=bbkivqubofqgn2nykl2uf3zue&st=bmjlp0ln&dl=0',
};

export default function June1(props) {
  const { onGoToDay } = props;

  const story = {
    title: 'Exploring Kyoto',
    recap: ['Waking up in Japan', 'The group walk', 'Free will', 'The welcome dinner at Zoronpa'],
    blocks: [
      { type: 'p', text: "Bro... we're lowk in Japan. 😳" },
      { type: 'video', src: VIDEO_URLS.japanTv, caption: 'Japanese broadcast in my room in Stay Sakura.' },
      {
        type: 'p',
        text: 'I recall taking a walk through the nearby Kyoto Gyoen National Garden early in the morning with my roommate and one other student. The garden was essentially a five minute walk from Stay Sakura, so I would return to it countless times throughout the trip.',
      },
      { type: 'p', text: 'I met my professor for the first time in person when I went to get my SIM card.' },

      { type: 'break' },

      {
        type: 'p',
        text: (
          <>
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
            to McDonald's.
          </>
        ),
      },
      { type: 'video', src: VIDEO_URLS.groupWalking, caption: 'Our group walking through Kyoto.' },

      { type: 'break' },

      {
        type: 'p',
        text: "It was at this moment, as I was waiting for members of the group to order their McDonald's, that I finally remembered that I have free will. So, I left. I went back to Kyoto Gyoen National Garden to take pictures/videos.",
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/6x3p1b7k91qkx8722vxq9/june1_gardenpic.JPG?rlkey=42oglgcfoqrj8rx5bzd2e9r7u&st=j85llrdz&dl=0',
          alt: 'A picture I took in Kyoto Gyoen National Garden',
          caption: 'A picture I took in Kyoto Gyoen National Garden.',
        }],
      },
      {
        type: 'video',
        src: VIDEO_URLS.gardenVid,
        caption: "The first photo/video I took with my Nikon in Japan. It's inside Kyoto Gyoen National Garden. You can hear me chewing gum like a chud.",
      },

      { type: 'break' },

      {
        type: 'p',
        text: (
          <>
            May 31st and June 1st are the only days in the entire trip in which I did not
            write down what I ate for dinner AND I did not take a picture of it. However, if
            my memory is correct, this was the day that we had our &quot;Welcome Dinner.&quot;
            It was held at{' '}
            <a
              className="jp-story-food-link"
              href="https://maps.app.goo.gl/FMMVqyAbV3jduAju8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zoronpa
            </a>.
          </>
        ),
      },
    ],
  };

  return <Journal {...props} onNext={props.onNextDay} story={story} />;
}
