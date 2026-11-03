import React from 'react';
import Journal from './designs/Journal';

const VIDEO_URLS = {
  planeseat:        'https://dl.dropboxusercontent.com/scl/fi/4n9d63e6ue78oz4sojgjb/may31_planeseat.mov?rlkey=i6009f1k8cfe2cofh5guxaq26&st=am7071f2&dl=0',
  hellokittyOutside:'https://dl.dropboxusercontent.com/scl/fi/ruof786mxwerpkfceu1l8/may31_hellokittyoutside.mov?rlkey=pew2nm20oq4frjwg17ptm27f5&st=0oqnji39&dl=0',
  roomTour:         'https://dl.dropboxusercontent.com/scl/fi/wzeqktnhq0hc1n9lsw26c/may31_mtvmycrib.mov?rlkey=dk6u19gtxamq5o3lpbn0brvio&st=py8lp2ul&dl=0',
};

/* The story is plain data so any design can render it. Nothing in `blocks`
   labels what is coming next; the title and recap only appear at the very end. */
const STORY = {
  title: 'Flight to Japan',
  recap: ['SFO to Kansai International', 'Immigration', 'The Hello Kitty Express', 'Stay Sakura Gyoen East'],
  blocks: [
    {
      type: 'p',
      text: "The flight to Japan was alright. I don't really have a problem with long plane rides like a lot of people do. One other member of the abroad program was on the same flight. I flew into Kansai International Airport.",
    },
    { type: 'video', src: VIDEO_URLS.planeseat, caption: "The seat display showing my flight's route from SFO to KIX." },
    { type: 'p', text: "Here's what I ate on the plane." },
    {
      type: 'photos',
      items: [
        {
          src: 'https://dl.dropboxusercontent.com/scl/fi/rrdej724e50itmdp7ysl5/may31_planedinner.jpg?rlkey=yx774pra0ke8zzoxqzd8eyc9c&st=2sjjsrj7&dl=0',
          alt: 'The first meal I was served on the flight (dinner)',
          caption: 'The first meal I was served on the flight (dinner).',
        },
        {
          src: 'https://dl.dropboxusercontent.com/scl/fi/kympe32gqak8wmgigcel3/may31_planebreakfast.jpg?rlkey=wk0hfx26mitynp40e9nj5ho03&st=9fncwdqp&dl=0',
          alt: 'The second meal I was served on the flight (breakfast)',
          caption: 'The second meal I was served on the flight (breakfast).',
        },
      ],
    },

    { type: 'break' },

    {
      type: 'p',
      text: 'When I was going through immigration, I specifically remember having trouble explaining the reason for my stay. I was trying to explain that I was here for study but I was staying at a hostel and it confused him. He said something like "I don\'t understand how you speak" haha.',
    },
    {
      type: 'p',
      text: 'Once I got to the exit of the airport, I met back up with the other guy who was on my flight who was also in the program. Soon after meeting, he realized that he lost his wallet. That really sucked for him. I never found out if he got that resolved.',
    },

    { type: 'break' },

    {
      type: 'p',
      text: 'We had arrived earlier than most other flights. So, we had two options: wait at the airport for everybody else to arrive (many hours) OR dip out to where we were staying on our own. We decided to dip out on the Hello Kitty Express.',
    },
    { type: 'video', src: VIDEO_URLS.hellokittyOutside, caption: 'The Hello Kitty Express from the outside.' },
    {
      type: 'photos',
      items: [{
        src: 'https://dl.dropboxusercontent.com/scl/fi/98whbd8yo5sp0gux2qniw/may31_hellokittyinside.jpg?rlkey=jgc73myjm0op12n0vsd3r9xq8&st=46zsfamr&dl=0',
        alt: 'Inside the Hello Kitty Express',
        caption: 'W Hello Kitty.',
      }],
    },
    {
      type: 'p',
      text: "I didn't realize how the ticket system worked. So, I didn't keep track of my ticket after getting on the train. When we had to exit the station, I did not have my ticket on hand to exit. I had to explain to an employee that I'm dumb and didn't know. He realized repaying would be expensive and he let me go through but said to be more careful in the future. Shout out to bro for that one. I ended up finding the ticket in my wallet on a future date.",
    },

    { type: 'break' },

    {
      type: 'p',
      text: 'We arrived at where we would be staying for the entire program, Stay Sakura Gyoen East. My roommate had not yet arrived. Here is the full room tour.',
    },
    { type: 'video', src: VIDEO_URLS.roomTour, caption: 'A tour of my room at Stay Sakura.' },
  ],
};

export default function May31(props) {
  return <Journal {...props} onNext={props.onNextDay} story={STORY} />;
}
