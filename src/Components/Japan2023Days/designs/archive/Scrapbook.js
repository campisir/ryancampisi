import React, { useRef } from 'react';
import { FoodEntry, MapEmbed } from '../../storyHelpers';
import { BackIcon, VideoPlayer, formatDateParts, scrollToDayTop, useReveal } from '../shared';

/* ARCHIVED design: "Scrapbook" — warm paper, polaroids, handwritten captions.
   Not used by the live site. See ./DesignPreview.js to try it again. */
export default function Scrapbook({
  date, dayNum, tripLength, onBack, onNext, onGoToFood, story,
}) {
  const rootRef = useRef(null);
  const ready = useReveal(rootRef);
  const { weekday, rest } = formatDateParts(date);

  // Alternate tilt so neighbouring photos never lean the same way.
  let tilt = 0;
  const nextTilt = () => {
    tilt += 1;
    return (tilt % 2 ? -1 : 1) * (1 + (tilt % 3) * 0.55);
  };
  const tiltStyle = () => ({ '--r': `${nextTilt()}deg` });

  const handleNext = () => {
    onNext();
    scrollToDayTop();
  };

  const renderBlock = (block, i) => {
    switch (block.type) {
      case 'p':
        return <p key={i} data-reveal className="jpb-p">{block.text}</p>;

      case 'video':
        return (
          <div key={i} data-reveal className="jpb-row">
            <figure className="jpb-polaroid jpb-polaroid-wide" style={tiltStyle()}>
              {block.src
                ? <VideoPlayer src={block.src} className="jpb-video" />
                : <div className="jpb-empty jpb-empty-wide">Video coming soon</div>}
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          </div>
        );

      case 'photos': {
        const count = block.items.length;
        return (
          <div key={i} data-reveal className={`jpb-row jpb-row-${count > 3 ? 'many' : count}`}>
            {block.items.map((item, j) => (
              <figure key={j} className="jpb-polaroid" style={tiltStyle()}>
                {item.src
                  ? <img src={item.src} alt={item.alt || ''} loading="lazy" />
                  : <div className="jpb-empty">Photo coming soon</div>}
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        );
      }

      case 'food': {
        const { type, ...foodProps } = block;
        return (
          <div key={i} data-reveal className="jpb-darkcard">
            <FoodEntry {...foodProps} onGoToFood={onGoToFood} />
          </div>
        );
      }

      case 'map':
        return (
          <div key={i} data-reveal className="jpb-darkcard">
            <MapEmbed src={block.src} title={block.title} caption={block.caption} />
          </div>
        );

      case 'location':
        return (
          <div key={i} data-reveal className="jpb-row">
            <figure className="jpb-polaroid jpb-polaroid-wide" style={tiltStyle()}>
              <div className="jpb-empty jpb-empty-wide">
                <strong>{block.coords}</strong>
                {block.note}
              </div>
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          </div>
        );

      case 'rating':
        return (
          <div key={i} data-reveal className="jpb-rating">
            <p className="jpb-rating-label">{block.label}</p>
            <p className="jpb-rating-grade">{block.grade}</p>
            <p className="jpb-rating-reason">{block.reason}</p>
          </div>
        );

      case 'break':
        return <div key={i} className="jpb-break" aria-hidden="true"><span>&#9992;</span></div>;

      default:
        return null;
    }
  };

  return (
    <div ref={rootRef} className={`jpd jpb${ready ? ' jpd-js' : ''}`}>
      <button className="jpb-back" onClick={onBack}>
        <BackIcon /> Back to overview
      </button>

      <div className="jpb-sheet">
        <div className="jpb-header">
          <span className="jpb-tape">Day {dayNum} of {tripLength}</span>
          <h2 className="jpb-date">
            {weekday}
            <small>{rest}</small>
          </h2>
        </div>

        <div className="jpb-body">
          {story.blocks.map(renderBlock)}
        </div>

        <div data-reveal className="jpb-ticket">
          <div className="jpb-ticket-main">
            <p className="jpb-ticket-label">Today&#39;s journey</p>
            <h3 className="jpb-ticket-title">{story.title}</h3>
            <ul className="jpb-ticket-stops">
              {story.recap.map((stop) => <li key={stop}>{stop}</li>)}
            </ul>
          </div>
          <div className="jpb-ticket-stub">
            <span>Day</span>
            <strong>{String(dayNum).padStart(2, '0')}</strong>
            {onNext && (
              <button className="jpb-next" onClick={handleNext}>Next day &rarr;</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
