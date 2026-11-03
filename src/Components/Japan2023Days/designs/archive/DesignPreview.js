import React, { useState } from 'react';
import Journal from '../Journal';
import Scrapbook from './Scrapbook';
import Route from './Route';
import { DesignSwitcher } from './DesignSwitcher';

/* Archived design previews.

   Journal is the live design. Scrapbook and Route are kept here in case they are wanted again.
   Both accept exactly the same props as Journal (date, dayNum, tripLength, onBack, onNext,
   onGoToFood, story), so they render every day's story unchanged.

   To bring them back:
   1. Add this line to pages/_app.js (Next.js only allows global CSS there). The stylesheet is
      deliberately not imported anywhere now, so it adds nothing to the bundle while unused:
        import '../src/Components/Japan2023Days/designs/archive/archive.css';
   2. Render <DesignPreview {...props} story={story} /> instead of <Journal ... /> in a day's file
      (e.g. May31.js) to get a floating A / B / C switcher, or render <Scrapbook /> / <Route />
      directly to switch a day permanently. */
export { Scrapbook, Route };

const DESIGNS = {
  A: { name: 'Journal', Component: Journal },
  B: { name: 'Scrapbook', Component: Scrapbook },
  C: { name: 'Route', Component: Route },
};

export default function DesignPreview(props) {
  const [design, setDesign] = useState('A');
  const { Component } = DESIGNS[design];

  return (
    <>
      <Component key={design} {...props} />
      <DesignSwitcher
        value={design}
        onChange={setDesign}
        options={Object.entries(DESIGNS).map(([id, d]) => ({ id, name: d.name }))}
      />
    </>
  );
}
