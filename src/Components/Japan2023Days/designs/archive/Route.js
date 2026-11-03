import React, { useRef } from 'react';
import { FoodEntry, MapEmbed } from '../../storyHelpers';
import {
  BackIcon, VideoPlayer, formatDateParts, scrollToDayTop, useReveal, useScrollProgress,
} from '../shared';

/* ARCHIVED design: "Route" — big type, a progress line that follows you down the page,
   and text that lights up as you reach it. Not used by the live site.
   See ./DesignPreview.js to try it again. */
export default function Route({
  date, dayNum, tripLength, onBack, onNext, onGoToFood, story,
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const ready = useReveal(rootRef);
  useScrollProgress(trackRef);
  const { weekday, rest } = formatDateParts(date);

  const pad = (n) => String(n).padStart(2, '0');
  let scene = 0;
  const node = (key) => {
    scene += 1;
    return (
      <div key={key} data-reveal className="jpc-node" aria-hidden="true">
        <span>{pad(scene)}</span>
      </div>
    );
  };

  const handleNext = () => {
    onNext();
    scrollToDayTop();
  };

  const renderBlock = (block, i) => {
    switch (block.type) {
      case 'p':
        return <p key={i} data-reveal className="jpc-p">{block.text}</p>;

      case 'video':
        return (
          <figure key={i} data-reveal className="jpc-figure">
            <div className={`jpc-media jpc-media-video${block.src ? '' : ' jpc-media-empty'}`}>
              {block.src
                ? <VideoPlayer src={block.src} className="jpc-video" />
                : <span>Video coming soon</span>}
            </div>
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        );

      case 'photos': {
        const count = block.items.length;
        return (
          <div key={i} data-reveal className={`jpc-figure jpc-photos jpc-photos-${count > 3 ? 4 : count}`}>
            {block.items.map((item, j) => (
              <figure key={j}>
                {item.src ? (
                  <div className="jpc-media">
                    <img src={item.src} alt={item.alt || ''} loading="lazy" />
                  </div>
                ) : (
                  <div className="jpc-media jpc-media-empty jpc-media-photo"><span>Photo coming soon</span></div>
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
          <div key={i} data-reveal className="jpc-figure jpc-food">
            <FoodEntry {...foodProps} onGoToFood={onGoToFood} />
          </div>
        );
      }

      case 'map':
        return (
          <div key={i} data-reveal className="jpc-figure jpc-food">
            <MapEmbed src={block.src} title={block.title} caption={block.caption} />
          </div>
        );

      case 'location':
        return (
          <figure key={i} data-reveal className="jpc-figure">
            <div className="jpc-media jpc-media-empty jpc-media-location">
              <strong>{block.coords}</strong>
              <span>{block.note}</span>
            </div>
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        );

      case 'rating':
        return (
          <div key={i} data-reveal className="jpc-rating">
            <div className="jpc-rating-head">
              <span className="jpc-kicker">{block.label}</span>
              <span className="jpc-rating-grade">{block.grade}</span>
            </div>
            <p>{block.reason}</p>
          </div>
        );

      case 'break':
        return node(i);

      default:
        return null;
    }
  };

  return (
    <div ref={rootRef} className={`jpd jpc${ready ? ' jpd-js' : ''}`}>
      <button className="jpc-back" onClick={onBack}>
        <BackIcon /> Back to overview
      </button>

      <div className="jpc-hero">
        <span className="jpc-hero-num" aria-hidden="true">{pad(dayNum)}</span>
        <div className="jpc-hero-meta">
          <p className="jpc-kicker">Day {dayNum} of {tripLength}</p>
          <h2 className="jpc-date">{weekday}<br />{rest}</h2>
          <p className="jpc-scroll-cue">Scroll to begin <span aria-hidden="true">&darr;</span></p>
        </div>
      </div>

      <div ref={trackRef} className="jpc-track">
        <div className="jpc-rail" aria-hidden="true"><i /></div>

        {node('start')}
        {story.blocks.map(renderBlock)}

        <div data-reveal className="jpc-node jpc-node-end" aria-hidden="true"><span>&#9873;</span></div>
        <div data-reveal className="jpc-recap">
          <p className="jpc-kicker">The day, in short</p>
          <h3 className="jpc-recap-title">{story.title}</h3>
          <ol className="jpc-recap-stops">
            {story.recap.map((stop, i) => (
              <li key={stop}><span>{pad(i + 1)}</span>{stop}</li>
            ))}
          </ol>
          {onNext && (
            <button className="jpc-next" onClick={handleNext}>
              On to Day {dayNum + 1} <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
