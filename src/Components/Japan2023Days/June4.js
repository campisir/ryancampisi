import React from 'react';
import { imgSlot, withCaption, chapterBreak, FoodEntry } from './storyHelpers';

const VIDEO_URLS = {
  profExplan: 'https://dl.dropboxusercontent.com/scl/fi/1bkb99b65byg8uszsj9yv/DSC_0040.MOV?rlkey=j80ddsyk7negoukj5ywbiiiau&st=4f82p1ac&dl=0',
  umeda:      'https://dl.dropboxusercontent.com/scl/fi/m7cn1ujhu1s81mpmgda31/DSC_0043.MOV?rlkey=d79xgqduyrhvrgrctayo55nb3&st=riil8rwk&dl=0',
  arcade1:    'https://dl.dropboxusercontent.com/scl/fi/wsepxvbnlmzgfxfjveoiw/DSC_0052.MOV?rlkey=otskpwr7hlezzlg7it4edyvik&st=2t90kyif&dl=0',
  arcade2:    'https://dl.dropboxusercontent.com/scl/fi/pyxnynflyt2twjp1hdlgd/DSC_0053.MOV?rlkey=ru76hqu8e88xgw6osggusz4f1&st=e5zi4d13&dl=0',
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

export default function June4({ date, dayNum, tripLength, onBack, onGoToFood, onShowRule, onGoToDay }) {
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
        <span className="jp-story-intro-tag">Class Excursion #1</span>
        <h3 className="jp-story-intro-title">Osaka Castle &amp; Osaka Umeda</h3>
        <p className="jp-story-intro-desc">
          The first class excursion was technically to Osaka Castle &#8212; but we
          didn&#39;t go inside. The professor took us to Osaka Umeda instead.
        </p>
      </div>

      <div className="jp-story-body">

        {/* ── Daiso ──────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I shopped at Daiso for the first time. I bought a bowl, some chips, and Demon Slayer
            curry. I recall accidentally scanning one of the items twice like a dumb gaijin and a
            worker needing to assist me.
          </p>
          <div className="jp-story-img-grid jp-story-img-grid-2">
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/qvrmjtfrjp0e2bwihfis8/june4_chips.jpg?rlkey=9jar12vp2u2oky4thhy1sefl4&st=7gupvh6h&dl=0', 'The chips I bought from Daiso')}
              <p className="jp-story-caption">The chips I bought from Daiso. They were pretty good.</p>
            </div>
            <div className="jp-story-grid-cell jp-story-grid-captioned">
              {imgSlot('', 'https://dl.dropboxusercontent.com/scl/fi/pa2w5hqyw4zi45491obv9/june4_demonslayercurry.jpg?rlkey=lkem85rcr2dn8xva4j42u7f0f&st=8ovnkp8j&dl=0', 'The Demon Slayer curry I bought from Daiso')}
              <p className="jp-story-caption">
                The Demon Slayer curry I bought from Daiso. I ate it on{' '}
                <button
                  className="jp-story-food-link"
                  onClick={() => onGoToDay && onGoToDay('2023-06-12')}
                >
                  June 12th
                </button>.
              </p>
            </div>
          </div>
        </div>

        {/* ── IC Card ────────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            I obtained an IC card which I would use for the remainder of my time in Japan.
            I actually still have it to this day.
          </p>
          {withCaption(
            imgSlot('jp-story-img-wide', 'https://dl.dropboxusercontent.com/scl/fi/p7dhee0midz7qmpn219ry/june4_iccard.jpg?rlkey=ndkb894qqndldfzucdg0t3dqe&st=m1vmg2nv&dl=0', 'The IC card.'),
            'The IC card.'
          )}
        </div>

        {/* ══ FIRST CLASS EXCURSION ════════════════ */}
        {chapterBreak('FIRST CLASS EXCURSION', 'excursion')}

        {/* ── Osaka Castle ───────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Osaka Castle</h4>
          </div>
          <p className="jp-story-prose">
            This was the day of the first class excursion. The excursion was to Osaka Castle.
            We traveled to Osaka Castle as one big group.
          </p>
          {withCaption(
            imgSlot('jp-story-img-wide', 'https://dl.dropboxusercontent.com/scl/fi/0wrt4cvwfoowqxv618jlz/june4_osakacastle.jpg?rlkey=qsn5gbfus4mh4xqsytp03erb5&st=k7vo7l1s&dl=0', 'A view of Osaka Castle, as we were walking up to it'),
            'A view of Osaka Castle, as we were walking up to it.'
          )}
        </div>

        {/* ── Prof Dips ──────────────────────────── */}
        <div className="jp-story-beat">
          <p className="jp-story-prose">
            We didn&#39;t actually go inside of the castle. Once we reached the outside, the
            professor explained that we could basically do whatever we wanted in Osaka. W prof?
          </p>
          {embeddedVideo(VIDEO_URLS.profExplan, 'The professor explaining how he\'s gonna dip out to Osaka Umeda.')}
        </div>

        {/* ══ OSAKA UMEDA ══════════════════════════ */}
        {chapterBreak('OSAKA UMEDA', 'umeda')}

        {/* ── Walking Through Umeda ──────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Osaka Umeda</h4>
          </div>
          <p className="jp-story-prose">
            I decided to stick with the professor (I mean, he&#39;s the expert on the area so I
            trusted he knew the cool spots to go). Me, the prof, and two other students headed
            for Osaka Umeda.
          </p>
          {embeddedVideo(VIDEO_URLS.umeda, 'Walking through the Osaka Umeda area. It was extremely crowded.')}
        </div>

        {/* ── Jump Store ─────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Jump Store</h4>
          </div>
          <p className="jp-story-prose">
            We went inside of this building where I saw my first Jump store.
          </p>
          {withCaption(
            imgSlot('jp-story-img-wide', 'https://dl.dropboxusercontent.com/scl/fi/ef99yay6jbqepooni2n3a/june4_jumpstatues.JPG?rlkey=5hdzbz26g1zwu0ptrvhmddgbk&st=uq1f9nah&dl=0', 'Statues of Luffy and Goku at the Jump store'),
            'Statues of Luffy and Goku at the Jump store.'
          )}
        </div>

        {/* ── Omurice ────────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Pomme&#39;s LINKS Umeda, 8F</h4>
          </div>
          <p className="jp-story-prose">
            We ended up eating at an Omurice place. I ordered Omurice in mushroom/spinach soup.
            Another student joined us while we were sat down, making it five of us.
          </p>
          <FoodEntry
            src="https://dl.dropboxusercontent.com/scl/fi/nmwml1a25tf8m1opccgvb/june4_omurice.jpg?rlkey=sjrw633s5ew6lozdw07obf5sj&st=sn5rtnpo&dl=0"
            alt="Omurice in spinach/mushroom soup"
            caption="Omurice in spinach/mushroom soup. It was good."
            locationUrl="https://maps.app.goo.gl/HAkYrrNkWUU6SiHp8"
            locationName="Pomme's LINKS Umeda, 8F"
            about="I didn't have location tagging enabled on my photos at the time, so I pieced the location together using photos and videos from before and after the meal, my menu item note, and my memory. That gave me high confidence that this was Pomme's LINKS Umeda, 8F. After having come to that conclusion, I found the old receipt from Pomme's, confirming my theory."
            onGoToFood={onGoToFood}
          />
        </div>

        {/* ── Arcades ────────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-beat-header">
            <h4 className="jp-story-beat-title">Electronics, Anime, Arcades</h4>
          </div>
          <p className="jp-story-prose">
            After eating, we went to an electronics store, an anime store, and a couple arcades.
          </p>
          {embeddedVideo(VIDEO_URLS.arcade1, 'Walking to find an arcade.')}
          <div style={{ marginTop: 16 }}>
            {embeddedVideo(VIDEO_URLS.arcade2, 'Inside of an arcade.')}
          </div>
        </div>

        {/* ══ THE VERDICT ══════════════════════════ */}
        {chapterBreak('THE VERDICT', 'verdict')}

        {/* ── Rating ─────────────────────────────── */}
        <div className="jp-story-beat">
          <div className="jp-story-rating-block">
            <div className="jp-story-rating-header">
              <span className="jp-story-rating-label">Excursion Rating</span>
              <span className="jp-story-rating-grade jp-rating-low">D&minus;</span>
            </div>
            <p className="jp-story-rating-reason">
              The day itself gets an A for being a fun time, but the excursion
              (Osaka Castle) was basically nonexistent because we didn&#39;t go inside.
              Note: I went inside Osaka Castle on{' '}
              <button
                className="jp-story-food-link"
                onClick={() => onGoToDay && onGoToDay('2023-07-10')}
              >
                July 10
              </button>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
