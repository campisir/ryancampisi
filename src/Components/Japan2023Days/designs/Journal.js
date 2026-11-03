import React, { useRef } from 'react';
import { FoodEntry, MapEmbed } from '../storyHelpers';
import { BackIcon, VideoPlayer, formatDateParts, scrollToDayTop, useReveal } from './shared';

/* Journal: the day-page design. Quiet, editorial, serif long-read.
   Renders the story shape documented in shared.js. */

const PhotoPlaceholder = ({ wide }) => (
  <div className={`jpa-frame jpa-placeholder${wide ? ' jpa-placeholder-wide' : ''}`}>
    <span>Photo coming soon</span>
  </div>
);

const renderBlock = (block, i, { firstParagraph, onGoToFood }) => {
  switch (block.type) {
    case 'p':
      return (
        <p key={i} data-reveal className={`jpa-p${i === firstParagraph ? ' jpa-p-first' : ''}`}>
          {block.text}
        </p>
      );

    case 'video':
      return (
        <figure key={i} data-reveal className="jpa-figure">
          <div className={`jpa-frame jpa-frame-video${block.src ? '' : ' jpa-frame-empty'}`}>
            {block.src
              ? <VideoPlayer src={block.src} className="jpa-video" />
              : <span className="jpa-placeholder-text">Video coming soon</span>}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case 'photos': {
      const count = block.items.length;
      return (
        <div key={i} data-reveal className={`jpa-figure jpa-photos jpa-photos-${count > 3 ? 4 : count}`}>
          {block.items.map((item, j) => (
            <figure key={j}>
              {item.src ? (
                <div className="jpa-frame">
                  <img src={item.src} alt={item.alt || ''} loading="lazy" />
                </div>
              ) : (
                <PhotoPlaceholder wide={count === 1} />
              )}
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
    }

    case 'food': {
      const { type, ...foodProps } = block;
      return (
        <div key={i} data-reveal className="jpa-figure jpa-food">
          <FoodEntry {...foodProps} onGoToFood={onGoToFood} />
        </div>
      );
    }

    case 'map':
      return (
        <div key={i} data-reveal className="jpa-figure jpa-map">
          <MapEmbed src={block.src} title={block.title} caption={block.caption} />
        </div>
      );

    case 'location':
      return (
        <figure key={i} data-reveal className="jpa-figure">
          <div className="jpa-frame jpa-frame-location">
            <span className="jpa-location-coords">{block.coords}</span>
            <span className="jpa-placeholder-text">{block.note}</span>
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case 'rating':
      return (
        <div key={i} data-reveal className="jpa-rating">
          <p className="jpa-rating-label">{block.label}</p>
          <p className="jpa-rating-grade">{block.grade}</p>
          <p className="jpa-rating-reason">{block.reason}</p>
        </div>
      );

    case 'break':
      return <div key={i} className="jpa-break" aria-hidden="true" />;

    default:
      return null;
  }
};

export default function Journal({
  date, dayNum, tripLength, onBack, onNext, onGoToFood, story,
}) {
  const rootRef = useRef(null);
  const ready = useReveal(rootRef);
  const { weekday, rest } = formatDateParts(date);
  const firstParagraph = story.blocks.findIndex((b) => b.type === 'p');

  const handleNext = () => {
    onNext();
    scrollToDayTop();
  };

  return (
    <div ref={rootRef} className={`jpd jpa${ready ? ' jpd-js' : ''}`}>
      <button className="jpa-back" onClick={onBack}>
        <BackIcon /> Back to overview
      </button>

      <div className="jpa-masthead">
        <span className="jpa-seal" aria-label={`Day ${dayNum}`}>{dayNum}</span>
        <p className="jpa-kicker">Day {dayNum} of {tripLength}</p>
        <h2 className="jpa-date">
          <span className="jpa-weekday">{weekday}</span>
          {rest}
        </h2>
      </div>

      <div className="jpa-body">
        {story.blocks.map((block, i) => renderBlock(block, i, { firstParagraph, onGoToFood }))}
      </div>

      <div data-reveal className="jpa-recap">
        <p className="jpa-recap-label">Day {dayNum}, in retrospect</p>
        <h3 className="jpa-recap-title">{story.title}</h3>
        <p className="jpa-recap-list">
          {story.recap.map((stop, i) => (
            <span key={stop}>{i > 0 && <i aria-hidden="true"> &middot; </i>}<b>{stop}</b></span>
          ))}
        </p>
        {onNext && (
          <button className="jpa-next" onClick={handleNext}>
            Continue to Day {dayNum + 1} <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </div>
    </div>
  );
}
