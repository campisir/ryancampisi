import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { logEvent } from '../utils/logging';

/* ─── Date helpers ──────────────────────────────────────────── */
const TRIP_START = new Date(2023, 4, 31); // May 31
const TRIP_END   = new Date(2023, 7,  1); // Aug 1

const MONTH_FULL  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_SHORT   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function generateTripDates() {
  const dates = [];
  const cur = new Date(TRIP_START);
  let dayNum = 1;
  while (cur <= TRIP_END) {
    dates.push({ date: new Date(cur), dayNum, dateStr: toDateStr(cur) });
    cur.setDate(cur.getDate() + 1);
    dayNum++;
  }
  return dates;
}

const TRIP_DATES = generateTripDates();

const TABS = [
  { id: 'info',        label: 'Info'       },
  { id: 'highlights',  label: 'Highlights' },
  { id: 'food',        label: 'Food'       },
  { id: 'weatherviz',  label: 'WeatherViz' },
];

/* ─── Component ─────────────────────────────────────────────── */
class Japan2023 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab:     'info',
      activeDate:    null,   // { date, dayNum, dateStr } | null
      showCalendar:  false,
      calMonth:      5,      // June (0-indexed) — initial calendar view
      calYear:       2023,
    };
    this.dateBarRef = React.createRef();
    // Pre-create a ref for every trip date so scrollIntoView works
    this.dateRefs = {};
    TRIP_DATES.forEach(d => { this.dateRefs[d.dateStr] = React.createRef(); });
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-HN847L26DC', { page_path: '/japan2023' });
    }
    try { logEvent('Japan 2023 Page View', 'User visited the Japan 2023 study abroad page'); }
    catch (_) {}
  }

  /* ── date bar selection ── */
  handleDateSelect = (dateObj) => {
    this.setState({ activeDate: dateObj, showCalendar: false }, () => {
      this.scrollDateIntoView(dateObj.dateStr);
    });
  }

  handleClearDate = () => { this.setState({ activeDate: null }); }

  handleTabSelect = (tabId) => { this.setState({ activeTab: tabId, activeDate: null }); }

  /* ── calendar ── */
  toggleCalendar = () => { this.setState(prev => ({ showCalendar: !prev.showCalendar })); }

  closeCalendar = () => { this.setState({ showCalendar: false }); }

  navigateCalendar = (dir) => {
    this.setState(prev => {
      let m = prev.calMonth + dir, y = prev.calYear;
      if (m > 11) { m = 0;  y++; }
      if (m <  0) { m = 11; y--; }
      // Clamp to May–Aug 2023
      if (y < 2023 || (y === 2023 && m < 4)) return null;
      if (y > 2023 || (y === 2023 && m > 7)) return null;
      return { calMonth: m, calYear: y };
    });
  }

  /* ── scroll helpers ── */
  scrollDateBar = (dir) => {
    const bar = this.dateBarRef.current;
    if (!bar) return;
    bar.scrollBy({ left: dir * 260, behavior: 'smooth' });
  }

  scrollDateIntoView = (dateStr) => {
    const ref = this.dateRefs[dateStr];
    const bar = this.dateBarRef.current;
    if (!ref?.current || !bar) return;
    const cell   = ref.current;
    const target = cell.offsetLeft - bar.offsetWidth / 2 + cell.offsetWidth / 2;
    bar.scrollTo({ left: target, behavior: 'smooth' });
  }

  /* ══════════════════════════════════════════════════════════
     RENDER — CALENDAR WIDGET
     ══════════════════════════════════════════════════════════ */
  renderCalendar() {
    const { showCalendar, calMonth, calYear, activeDate } = this.state;
    if (!showCalendar) return null;

    const firstWeekday = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth  = new Date(calYear, calMonth + 1, 0).getDate();
    const cells = [
      ...Array(firstWeekday).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const canPrev = !(calYear === 2023 && calMonth === 4); // not before May
    const canNext = !(calYear === 2023 && calMonth === 7); // not after Aug

    return (
      <div className="jp-calendar-overlay" onClick={this.closeCalendar}>
        <div className="jp-calendar-modal" onClick={e => e.stopPropagation()}>

          <div className="jp-cal-header">
            <button
              className={`jp-cal-nav${canPrev ? '' : ' disabled'}`}
              onClick={() => canPrev && this.navigateCalendar(-1)}
              aria-label="Previous month"
            >&#8249;</button>
            <span className="jp-cal-month-label">{MONTH_FULL[calMonth]} {calYear}</span>
            <button
              className={`jp-cal-nav${canNext ? '' : ' disabled'}`}
              onClick={() => canNext && this.navigateCalendar(1)}
              aria-label="Next month"
            >&#8250;</button>
          </div>

          <div className="jp-cal-day-names">
            {DAY_SHORT.map(d => <span key={d} className="jp-cal-day-name">{d}</span>)}
          </div>

          <div className="jp-cal-grid">
            {cells.map((day, i) => {
              if (!day) return <span key={`e-${i}`} className="jp-cal-cell empty" />;
              const d       = new Date(calYear, calMonth, day);
              const dStr    = toDateStr(d);
              const inTrip  = d >= TRIP_START && d <= TRIP_END;
              const tripObj = inTrip ? TRIP_DATES.find(t => t.dateStr === dStr) : null;
              const isActive = activeDate?.dateStr === dStr;
              return (
                <button
                  key={dStr}
                  className={`jp-cal-cell${inTrip ? ' in-trip' : ' out-of-trip'}${isActive ? ' active' : ''}`}
                  onClick={() => tripObj && this.handleDateSelect(tripObj)}
                  disabled={!inTrip}
                >
                  {day}
                  {tripObj && <span className="jp-cal-day-num">D{tripObj.dayNum}</span>}
                </button>
              );
            })}
          </div>

          <button className="jp-cal-close" onClick={this.closeCalendar}>Close</button>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     RENDER — DATE BAR
     ══════════════════════════════════════════════════════════ */
  renderDateBar() {
    const { activeDate } = this.state;

    // Group dates by month
    const groups = {};
    const order  = [];
    TRIP_DATES.forEach(d => {
      const key = `${d.date.getFullYear()}-${d.date.getMonth()}`;
      if (!groups[key]) {
        groups[key] = { label: MONTH_SHORT[d.date.getMonth()], dates: [] };
        order.push(key);
      }
      groups[key].dates.push(d);
    });

    return (
      <div className="jp-datebar-wrapper">
        <button
          className="jp-calendar-btn"
          onClick={this.toggleCalendar}
          title="Open calendar"
          aria-label="Jump to date"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8"  y1="2" x2="8"  y2="6"/>
            <line x1="3"  y1="10" x2="21" y2="10"/>
          </svg>
        </button>

        <button
          className="jp-datebar-arrow"
          onClick={() => this.scrollDateBar(-1)}
          aria-label="Scroll dates left"
        >
          &#10094;
        </button>

        <div className="jp-datebar" ref={this.dateBarRef}>
          {order.map(key => (
            <React.Fragment key={key}>
              <span className="jp-datebar-month-label">{groups[key].label}</span>
              {groups[key].dates.map(dateObj => {
                const isActive = activeDate?.dateStr === dateObj.dateStr;
                return (
                  <button
                    key={dateObj.dateStr}
                    ref={this.dateRefs[dateObj.dateStr]}
                    className={`jp-date-cell${isActive ? ' active' : ''}`}
                    onClick={() => this.handleDateSelect(dateObj)}
                    title={dateObj.date.toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric',
                    })}
                  >
                    <span className="jp-date-cell-num">{dateObj.date.getDate()}</span>
                    <span className="jp-date-cell-day">{DAY_SHORT[dateObj.date.getDay()]}</span>
                    <span className="jp-date-cell-dayn">D{dateObj.dayNum}</span>
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <button
          className="jp-datebar-arrow"
          onClick={() => this.scrollDateBar(1)}
          aria-label="Scroll dates right"
        >
          &#10095;
        </button>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     RENDER — TAB BAR
     ══════════════════════════════════════════════════════════ */
  renderTabs() {
    const { activeTab, activeDate } = this.state;
    return (
      <div className="jp-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={[
              'jp-tab',
              activeTab === t.id && !activeDate ? 'active'  : '',
              activeDate                        ? 'dimmed'  : '',
            ].join(' ').trim()}
            onClick={() => this.handleTabSelect(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     RENDER — CONTENT ROUTER
     ══════════════════════════════════════════════════════════ */
  renderContent() {
    const { activeDate, activeTab } = this.state;
    if (activeDate) return this.renderDayView(activeDate);
    switch (activeTab) {
      case 'info':        return this.renderInfoTab();
      case 'highlights':  return this.renderHighlightsTab();
      case 'food':        return this.renderFoodTab();
      case 'weatherviz':  return this.renderWeatherVizTab();
      default:            return this.renderInfoTab();
    }
  }

  /* ══════════════════════════════════════════════════════════
     TAB: INFO
     ══════════════════════════════════════════════════════════ */
  renderInfoTab() {
    const cities = [
      { name: 'Kyoto',     sub: 'Home base · full 63 days'       },
      { name: 'Osaka',     sub: 'Day & night trips · many times' },
      { name: 'Kobe',      sub: 'Day trips · a few times'        },
      { name: 'Tokyo',     sub: 'Backpacking · ~1 week'          },
      { name: 'Hiroshima', sub: 'Overnight trip · 2 days'        },
      { name: 'Shizuoka',  sub: 'Day trip'                       },
    ];

    return (
      <div className="jp-content jp-info">

        {/* Hero card */}
        <div className="jp-info-hero-card">
          <div className="jp-info-hero-card-left">
            <div className="jp-info-badge">UF Study Abroad · Cohort #2</div>
            <h2 className="jp-info-title">Japan Summer 2023</h2>
            <p className="jp-info-lead">
              A 63-day study abroad program in Kyoto, Japan through the University of
              Florida&#39;s <em>UF in Japan Design</em> initiative. As part of the second
              cohort, I spent the summer taking two computer engineering electives alongside
              roughly 30 fellow students — with a constant emphasis on exploring Japan
              independently beyond the classroom.
            </p>
            <div className="jp-info-dates-row">
              <span className="jp-info-date-chip">May 31, 2023</span>
              <span className="jp-info-date-arrow">&#8594;</span>
              <span className="jp-info-date-chip">August 1, 2023</span>
            </div>
            <a
              href="https://cpe.eng.ufl.edu/uf-in-japan-design/"
              target="_blank"
              rel="noopener noreferrer"
              className="jp-info-ext-link"
            >
              Program Website &#8599;
            </a>
          </div>
          <div className="jp-info-hero-card-right">
            <div className="jp-info-map-placeholder">Map or hero photo</div>
          </div>
        </div>

        {/* Stats */}
        <div className="jp-stats-row">
          {[
            { value: '63',  label: 'Days Abroad'  },
            { value: '6',   label: 'Credit Hours' },
            { value: '#2',  label: 'Cohort'        },
            { value: '6',   label: 'Destinations' },
          ].map(s => (
            <div key={s.label} className="jp-stat-card">
              <span className="jp-stat-value">{s.value}</span>
              <span className="jp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Why I Did It + The Program */}
        <div className="jp-courses-row">
          <div className="jp-section-block" style={{ marginBottom: 0 }}>
            <h3 className="jp-section-block-title">Why I Did It</h3>
            <p className="jp-info-prose">
              Going into my third year at UF, I was majoring in Computer Science and
              Mathematics and needed two more elective credits to complete my CS degree.
              This program was a perfect fit on every level.
            </p>
            <p className="jp-info-prose">
              It covered exactly the credits I needed, my financial aid fully covered the
              cost of the trip, and — most importantly — it let me check off a goal I had
              set before I even started college: do a study abroad at some point. Japan
              had always been at the top of my list.
            </p>
            <p className="jp-info-prose">
              I graduated in May 2024, so this was the summer going into my final year.
            </p>
          </div>

          <div className="jp-section-block" style={{ marginBottom: 0 }}>
            <h3 className="jp-section-block-title">The Program</h3>
            <p className="jp-info-prose">
              The{' '}
              <a
                href="https://cpe.eng.ufl.edu/uf-in-japan-design/"
                target="_blank"
                rel="noopener noreferrer"
                className="jp-info-inline-link"
              >
                UF in Japan Design
              </a>{' '}
              program is based in Kyoto and is still active and growing — it has since
              expanded to offer Fall and Spring cohorts beyond the original summer-only
              format. Our group of roughly 30 students was the second cohort.
            </p>
            <p className="jp-info-prose">
              Originally we were set to partner with Kyoto University for classroom space,
              but those arrangements didn&#39;t come through for our cycle. We visited
              Kyoto University as a field trip instead; other cohorts have had the
              full partnership.
            </p>
            <p className="jp-info-prose">
              A major theme from the instructor was independent exploration — he actively
              encouraged everyone to travel and experience as much of Japan as possible
              on their own outside of class.
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="jp-courses-row">
          <div className="jp-course-card">
            <div className="jp-course-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div className="jp-course-body">
              <span className="jp-course-code">CEN4930</span>
              <h3 className="jp-course-title">
                Performant Python Programming
                <span className="jp-course-credits">3 cr</span>
              </h3>
              <p className="jp-course-desc">
                Covered Python from fundamentals through performance-focused techniques
                and applied project development. This class started online a few weeks
                before we flew to Japan. The final project was WeatherViz, a weather
                data visualization tool built collaboratively with a small group.
              </p>
              <div className="jp-course-tags">
                <span className="jp-tag">Python</span>
                <span className="jp-tag">Programming</span>
                <span className="jp-tag">WeatherViz</span>
              </div>
              <p className="jp-course-location">Held in a classroom in a private building in Kyoto.</p>
            </div>
          </div>

          <div className="jp-course-card">
            <div className="jp-course-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div className="jp-course-body">
              <span className="jp-course-code">CEN4930</span>
              <h3 className="jp-course-title">
                Cross Cultural Design
                <span className="jp-course-credits">3 cr</span>
              </h3>
              <p className="jp-course-desc">
                Explored how engineering practices, design philosophies, and professional
                norms differ across cultures, with a strong focus on Japan. CEN4930 is
                the designated course code at UF for computer engineering electives.
              </p>
              <div className="jp-course-tags">
                <span className="jp-tag">Engineering</span>
                <span className="jp-tag">Culture</span>
                <span className="jp-tag">Design</span>
                <span className="jp-tag">Japan</span>
              </div>
              <p className="jp-course-location">
                Held outdoors next to the Kamo River — we sat in the grass while the
                instructor used a karaoke-style mic setup to be heard over the cicadas.
              </p>
            </div>
          </div>
        </div>

        {/* Grade callout */}
        <div className="jp-info-grade-callout">
          <span className="jp-grade-a">A</span>
          <span className="jp-grade-plus">+</span>
          <span className="jp-grade-a">A</span>
          <span className="jp-grade-label">Finished both courses with an A.</span>
        </div>

        {/* Cities */}
        <div className="jp-section-block">
          <h3 className="jp-section-block-title">Cities &amp; Destinations</h3>
          <p className="jp-placeholder-note">Photos coming — add one per city when ready.</p>
          <div className="jp-city-grid">
            {cities.map(city => (
              <div key={city.name} className="jp-city-card">
                <div className="jp-city-image-placeholder" />
                <span className="jp-city-name">{city.name}</span>
                <span className="jp-city-sub">{city.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Page footnote */}
        <div className="jp-info-footnote">
          <span className="jp-info-footnote-icon">&#9998;</span>
          <p>
            This page was built in late 2026 — over three years after the trip. Most of
            the detail across the site comes from notes I kept in my phone every day I
            was there, along with photos and videos from the trip.
          </p>
        </div>

      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     TAB: HIGHLIGHTS
     ══════════════════════════════════════════════════════════ */
  renderHighlightsTab() {
    const items = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));
    return (
      <div className="jp-content jp-highlights">
        <div className="jp-section-header">
          <h2 className="jp-section-heading">Trip Highlights</h2>
          <p className="jp-section-subheading">
            A curated collection of the best experiences from the trip — the moments
            that stood out the most.
          </p>
        </div>
        <div className="jp-highlights-grid">
          {items.map(h => (
            <div key={h.id} className="jp-highlight-card">
              <div className="jp-highlight-image-placeholder">
                <span className="jp-placeholder-icon">+</span>
                <span className="jp-placeholder-text">Add Photo</span>
              </div>
              <div className="jp-highlight-body">
                <span className="jp-highlight-date">Add date</span>
                <h3 className="jp-highlight-title">Highlight Title</h3>
                <p className="jp-highlight-desc">Add a description of this highlight...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     TAB: FOOD
     ══════════════════════════════════════════════════════════ */
  renderFoodTab() {
    const categories = ['All', 'Ramen', 'Sushi', 'Izakaya', 'Convenience', 'Street Food', 'Sweets', 'Cafe'];
    const items = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));
    return (
      <div className="jp-content jp-food">
        <div className="jp-section-header">
          <h2 className="jp-section-heading">Food Journal</h2>
          <p className="jp-section-subheading">Every memorable meal from the trip.</p>
        </div>
        <div className="jp-food-filters">
          {categories.map((cat, i) => (
            <button key={cat} className={`jp-food-filter-btn${i === 0 ? ' active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="jp-food-grid">
          {items.map(f => (
            <div key={f.id} className="jp-food-card">
              <div className="jp-food-image-placeholder">
                <span className="jp-placeholder-icon">+</span>
                <span className="jp-placeholder-text">Add Photo</span>
              </div>
              <div className="jp-food-body">
                <h4 className="jp-food-name">Food Name</h4>
                <span className="jp-food-restaurant">Restaurant Name</span>
                <div className="jp-food-meta">
                  <span className="jp-food-date">Add date</span>
                  <div className="jp-food-rating">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className="jp-star empty">&#9733;</span>
                    ))}
                  </div>
                </div>
                <p className="jp-food-notes">Add notes...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     TAB: WEATHERVIZ
     ══════════════════════════════════════════════════════════ */
  renderWeatherVizTab() {
    return (
      <div className="jp-content jp-weatherviz">

        {/* Hero */}
        <div className="jp-wv-hero">
          <div className="jp-wv-hero-content">
            <div className="jp-wv-badge">Python Class Project · Summer 2023</div>
            <h2 className="jp-wv-title">WeatherViz</h2>
            <p className="jp-wv-subtitle">
              A weather data visualization tool built as the final project for the
              Python Programming course during the UF study abroad program in Japan.
              Developed collaboratively with a small group.
            </p>
            <div className="jp-wv-links">
              <a href="#" className="jp-wv-link primary">GitHub</a>
              <a href="#" className="jp-wv-link secondary">Live Demo</a>
            </div>
          </div>
          <div className="jp-wv-hero-visual">
            <div className="jp-wv-screenshot-placeholder">Screenshot / Demo GIF</div>
          </div>
        </div>

        <div className="jp-wv-body">

          {/* Description */}
          <div className="jp-wv-section">
            <h3 className="jp-wv-section-title">About the Project</h3>
            <p className="jp-wv-desc">
              Add a full description of WeatherViz here — what it does, what data it uses,
              how it works, and what you personally contributed to the project.
            </p>
          </div>

          {/* Tech stack + Team */}
          <div className="jp-wv-two-col">
            <div className="jp-wv-section">
              <h3 className="jp-wv-section-title">Tech Stack</h3>
              <div className="jp-tech-list">
                {['Python', 'matplotlib', 'pandas', 'Add more...'].map(t => (
                  <span key={t} className="jp-tech-badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="jp-wv-section">
              <h3 className="jp-wv-section-title">Team</h3>
              <div className="jp-team-list">
                <div className="jp-team-member">
                  <div className="jp-member-avatar" />
                  <span className="jp-member-name">Ryan Campisi</span>
                </div>
                <div className="jp-team-member">
                  <div className="jp-member-avatar placeholder" />
                  <span className="jp-member-name">Add Teammate</span>
                </div>
                <div className="jp-team-member">
                  <div className="jp-member-avatar placeholder" />
                  <span className="jp-member-name">Add Teammate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="jp-wv-section">
            <h3 className="jp-wv-section-title">Key Features</h3>
            <div className="jp-features-grid">
              {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'].map((f, i) => (
                <div key={i} className="jp-feature-card">
                  <div className="jp-feature-icon-placeholder" />
                  <h4 className="jp-feature-name">{f}</h4>
                  <p className="jp-feature-desc">Describe this feature of WeatherViz.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code preview */}
          <div className="jp-wv-section">
            <h3 className="jp-wv-section-title">Code Preview</h3>
            <div className="jp-code-preview">
              <pre className="jp-code-block"><code>{`# Paste a representative WeatherViz snippet here
import matplotlib.pyplot as plt
import pandas as pd

# Your WeatherViz code...
`}</code></pre>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     DAY VIEW
     ══════════════════════════════════════════════════════════ */
  renderDayView({ date, dayNum }) {
    const formatted = date.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
    return (
      <div className="jp-content jp-day-view">

        <div className="jp-day-header">
          <div className="jp-day-header-left">
            <span className="jp-day-num-badge">Day {dayNum} of {TRIP_DATES.length}</span>
            <h2 className="jp-day-date">{formatted}</h2>
          </div>
          <button className="jp-day-close" onClick={this.handleClearDate}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6"  y1="6" x2="18" y2="18"/>
            </svg>
            Back to overview
          </button>
        </div>

        <div className="jp-day-body">

          {/* Main column */}
          <div className="jp-day-main">
            <div className="jp-day-section">
              <h3 className="jp-day-section-title">Activities</h3>
              <div className="jp-day-timeline">
                {['Morning', 'Afternoon', 'Evening'].map(period => (
                  <div key={period} className="jp-timeline-entry">
                    <div className="jp-timeline-time">{period}</div>
                    <div className="jp-timeline-content">
                      <p className="jp-timeline-placeholder">
                        Add {period.toLowerCase()} activities for this day...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="jp-day-section">
              <h3 className="jp-day-section-title">Photos</h3>
              <div className="jp-day-photo-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="jp-day-photo-slot">
                    <span className="jp-placeholder-icon">+</span>
                    <span className="jp-placeholder-text">Add Photo</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="jp-day-sidebar">
            <div className="jp-day-section">
              <h3 className="jp-day-section-title">Location</h3>
              <div className="jp-day-location-placeholder">Add location / city for this day...</div>
            </div>

            <div className="jp-day-section">
              <h3 className="jp-day-section-title">Food</h3>
              <div className="jp-day-food-list">
                {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
                  <div key={meal} className="jp-day-meal-entry">
                    <span className="jp-day-meal-label">{meal}</span>
                    <span className="jp-day-meal-placeholder">Add {meal.toLowerCase()}...</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="jp-day-section">
              <h3 className="jp-day-section-title">Notes</h3>
              <div className="jp-day-notes-placeholder">
                <p>Add journal notes for this day...</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     ROOT RENDER
     ══════════════════════════════════════════════════════════ */
  render() {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Japan 2023 | Ryan Campisi</title>
          <meta
            name="description"
            content="Ryan Campisi's 63-day study abroad trip to Japan in Summer 2023 through the University of Florida — courses, travel, food, and the WeatherViz Python project."
          />
          <meta property="og:type"  content="website" />
          <meta property="og:title" content="Japan 2023 | Ryan Campisi" />
          <meta property="og:url"   content="https://www.ryancampisi.com/japan2023" />
        </Head>

        <div className="jp-page">

          {/* Hero */}
          <div className="jp-hero">
            <div className="jp-hero-sun" aria-hidden="true" />
            <Link href="/" className="jp-hero-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              ryancampisi.com
            </Link>
            <div className="jp-hero-content">
              <div className="jp-hero-eyebrow">University of Florida · Study Abroad</div>
              <h1 className="jp-hero-title">Japan 2023</h1>
              <p className="jp-hero-subtitle">
                63 days exploring Japan through food, culture, code, and adventure.
              </p>
              <div className="jp-hero-meta">
                <span className="jp-hero-meta-item">May 31 – August 1, 2023</span>
                <span className="jp-hero-meta-sep">·</span>
                <span className="jp-hero-meta-item">2 Courses</span>
                <span className="jp-hero-meta-sep">·</span>
                <span className="jp-hero-meta-item">1 Group Project</span>
              </div>
            </div>
          </div>

          {/* Sticky navigation */}
          <div className="jp-nav-sticky">
            {this.renderDateBar()}
            {this.renderTabs()}
          </div>

          {/* Main content */}
          {this.renderContent()}

          {/* Calendar overlay (portal-style) */}
          {this.renderCalendar()}

        </div>
      </>
    );
  }
}

export default Japan2023;
