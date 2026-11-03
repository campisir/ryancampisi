import React from 'react';
import Journal from './designs/Journal';

const VIDEO_URLS = {
  profExplan: 'https://dl.dropboxusercontent.com/scl/fi/1bkb99b65byg8uszsj9yv/DSC_0040.MOV?rlkey=j80ddsyk7negoukj5ywbiiiau&st=4f82p1ac&dl=0',
  umeda:      'https://dl.dropboxusercontent.com/scl/fi/m7cn1ujhu1s81mpmgda31/DSC_0043.MOV?rlkey=d79xgqduyrhvrgrctayo55nb3&st=riil8rwk&dl=0',
  arcade1:    'https://dl.dropboxusercontent.com/scl/fi/wsepxvbnlmzgfxfjveoiw/DSC_0052.MOV?rlkey=otskpwr7hlezzlg7it4edyvik&st=2t90kyif&dl=0',
  arcade2:    'https://dl.dropboxusercontent.com/scl/fi/pyxnynflyt2twjp1hdlgd/DSC_0053.MOV?rlkey=ru76hqu8e88xgw6osggusz4f1&st=e5zi4d13&dl=0',
};

export default function June4(props) {
  const { onGoToDay } = props;

  const story = {
    title: 'Osaka Castle & Osaka Umeda',
    recap: ['Daiso and an IC card', 'Osaka Castle (from the outside)', 'Osaka Umeda', 'Omurice and arcades'],
    blocks: [
      {
        type: 'p',
        text: 'I shopped at Daiso for the first time. I bought a bowl, some chips, and Demon Slayer curry. I recall accidentally scanning one of the items twice like a dumb gaijin and a worker needing to assist me.',
      },
      {
        type: 'photos',
        items: [
          {
            src: 'https://dl.dropboxusercontent.com/scl/fi/qvrmjtfrjp0e2bwihfis8/june4_chips.jpg?rlkey=9jar12vp2u2oky4thhy1sefl4&st=7gupvh6h&dl=0',
            alt: 'The chips I bought from Daiso',
            caption: 'The chips I bought from Daiso. They were pretty good.',
          },
          {
            src: 'https://dl.dropboxusercontent.com/scl/fi/pa2w5hqyw4zi45491obv9/june4_demonslayercurry.jpg?rlkey=lkem85rcr2dn8xva4j42u7f0f&st=8ovnkp8j&dl=0',
            alt: 'The Demon Slayer curry I bought from Daiso',
            caption: (
              <>
                The Demon Slayer curry I bought from Daiso. I ate it on{' '}
                <button
                  className="jp-story-food-link"
                  onClick={() => onGoToDay && onGoToDay('2023-06-12')}
                >
                  June 12th
                </button>.
              </>
            ),
          },
        ],
      },
      {
        type: 'p',
        text: 'I obtained an IC card which I would use for the remainder of my time in Japan. I actually still have it to this day.',
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/p7dhee0midz7qmpn219ry/june4_iccard.jpg?rlkey=ndkb894qqndldfzucdg0t3dqe&st=m1vmg2nv&dl=0',
          alt: 'The IC card.',
          caption: 'The IC card.',
        }],
      },

      { type: 'break' },

      {
        type: 'p',
        text: 'This was the day of the first class excursion. The excursion was to Osaka Castle. We traveled to Osaka Castle as one big group.',
      },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/0wrt4cvwfoowqxv618jlz/june4_osakacastle.jpg?rlkey=qsn5gbfus4mh4xqsytp03erb5&st=k7vo7l1s&dl=0',
          alt: 'A view of Osaka Castle, as we were walking up to it',
          caption: 'A view of Osaka Castle, as we were walking up to it.',
        }],
      },
      {
        type: 'p',
        text: "We didn't actually go inside of the castle. Once we reached the outside, the professor explained that we could basically do whatever we wanted in Osaka. W prof?",
      },
      { type: 'video', src: VIDEO_URLS.profExplan, caption: "The professor explaining how he's gonna dip out to Osaka Umeda." },

      { type: 'break' },

      {
        type: 'p',
        text: "I decided to stick with the professor. Me, the prof, and two other students headed for Osaka Umeda.",
      },
      { type: 'video', src: VIDEO_URLS.umeda, caption: 'Walking through the Osaka Umeda area. It was extremely crowded.' },
      { type: 'p', text: 'We went inside of this building where I saw my first Jump store.' },
      {
        type: 'photos',
        items: [{
          src: 'https://dl.dropboxusercontent.com/scl/fi/ef99yay6jbqepooni2n3a/june4_jumpstatues.JPG?rlkey=5hdzbz26g1zwu0ptrvhmddgbk&st=uq1f9nah&dl=0',
          alt: 'Statues of Luffy and Goku at the Jump store',
          caption: 'Statues of Luffy and Goku at the Jump store.',
        }],
      },
      {
        type: 'p',
        text: 'We ended up eating at an Omurice place. I ordered Omurice in mushroom/spinach soup. Another student joined us while we were sat down, making it five of us.',
      },
      {
        type: 'food',
        src: 'https://dl.dropboxusercontent.com/scl/fi/nmwml1a25tf8m1opccgvb/june4_omurice.jpg?rlkey=sjrw633s5ew6lozdw07obf5sj&st=sn5rtnpo&dl=0',
        alt: 'Omurice in spinach/mushroom soup',
        caption: 'Omurice in spinach/mushroom soup. It was good.',
        locationUrl: 'https://maps.app.goo.gl/HAkYrrNkWUU6SiHp8',
        locationName: "Pomme's LINKS Umeda, 8F",
        about: "I didn't have location tagging enabled on my photos at the time, so I pieced the location together using photos and videos from before and after the meal, my menu item note, and my memory. That gave me high confidence that this was Pomme's LINKS Umeda, 8F. After having come to that conclusion, I found the old receipt from Pomme's, confirming my theory.",
      },
      { type: 'p', text: 'After eating, we went to an electronics store, an anime store, and a couple arcades.' },
      { type: 'video', src: VIDEO_URLS.arcade1, caption: 'Walking to find an arcade.' },
      { type: 'video', src: VIDEO_URLS.arcade2, caption: 'Inside of an arcade.' },

      { type: 'break' },

      {
        type: 'rating',
        label: 'Excursion Rating',
        grade: 'D\u2212',
        reason: (
          <>
            The day itself gets an A for being a fun time, but the excursion
            (Osaka Castle) was basically nonexistent because we didn&apos;t go inside.
            Note: I went inside Osaka Castle on{' '}
            <button
              className="jp-story-food-link"
              onClick={() => onGoToDay && onGoToDay('2023-07-10')}
            >
              July 10
            </button>.
          </>
        ),
      },
    ],
  };

  return <Journal {...props} onNext={props.onNextDay} story={story} />;
}
