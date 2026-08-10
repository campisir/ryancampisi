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
      calMonth:      5,      // June (0-indexed), initial calendar view
      calYear:       2023,
      showRule2Popup: false,
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

  /* ── lookup a trip date by dateStr ── */
  findTripDate = (dateStr) => TRIP_DATES.find(d => d.dateStr === dateStr) || null;

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
     RENDER: CALENDAR WIDGET
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
     RENDER: DATE BAR
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0 }}>
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
     RENDER: TAB BAR
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
     RENDER: CONTENT ROUTER
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
              roughly 30 fellow students.
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
              cost of the trip, and most importantly, it let me check off a goal I had
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
              program is based in Kyoto and is still active and growing. It has since
              expanded to offer Fall and Spring cohorts beyond the original summer-only
              format. Our group of roughly 30 students was the second cohort.
            </p>
            <p className="jp-info-prose">
              Originally we were set to partner with Kyoto University for classroom space,
              but those arrangements didn&#39;t come through for our cycle. We visited
              Kyoto University as a field trip instead; other cohorts have had the
              full partnership.
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="jp-courses-row">
          <div className="jp-course-card">
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
              <div className="jp-course-grade">Final Grade: <span>A</span></div>
            </div>
            <div className="jp-course-photo">
              <img
                src="https://dl.dropboxusercontent.com/scl/fi/gpcaxivpzn4gzq3g2mgpn/Photo-Jul-25-2023-9-27-49-AM.jpg?rlkey=ycqvf3xnq36itljyomr6jpqgh&st=4t5lpp4w&raw=1"
                alt="Performant Python Programming classroom in Kyoto"
                loading="lazy"
              />
            </div>
            <span className="jp-course-caption">One of the graduate students giving a presentation in the classroom we used for Performant Python Programming.</span>
          </div>

          <div className="jp-course-card">
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
              <div className="jp-course-grade">Final Grade: <span>A</span></div>
            </div>
            <div className="jp-course-photo">
              <img
                src="https://dl.dropboxusercontent.com/scl/fi/emmhj865qsckwy4ct0eds/DSC_0488.JPG?rlkey=efr5nqi0axiy17qtjqu8joi6l&st=vwyx9i6j&raw=1"
                alt="Cross Cultural Design class by the Kamo River in Kyoto"
                loading="lazy"
              />
            </div>
            <span className="jp-course-caption">Cross Cultural Design class by the Kamo River. The instructor used a karaoke mic so we could hear him over the cicadas (they were loud af).</span>
          </div>
        </div>

        {/* Three Rules */}
        <div className="jp-section-block">
          <h3 className="jp-section-block-title">Three Rules I Set for Myself</h3>
          <div className="jp-rules-list">
            <div className="jp-rule-item">
              <span className="jp-rule-num">1</span>
              <div className="jp-rule-content">
                <h4 className="jp-rule-title">Say yes to everything on Teams</h4>
                <p className="jp-rule-desc">
                  If someone posted in the class Teams chat asking if anyone wanted to join them
                  somewhere, I had to reach out. If someone shared a recommendation, I had to
                  go check it out. As someone who thoroughly enjoys doing things solo, I made this rule to keep myself connected to the rest of the group on some level.
                </p>
              </div>
            </div>
            <div className="jp-rule-item">
              <span className="jp-rule-num">2</span>
              <div className="jp-rule-content">
                <h4 className="jp-rule-title">Never eat at the same place twice</h4>
                <p className="jp-rule-desc">
                  Every single day, I had to find a new restaurant or food spot.
                  This pushed me to explore areas I would have otherwise missed. This also helped keep me out of my comfort zone.
                </p>
              </div>
            </div>
            <div className="jp-rule-item">
              <span className="jp-rule-num">3</span>
              <div className="jp-rule-content">
                <h4 className="jp-rule-title">Log everything in my notes app</h4>
                <p className="jp-rule-desc">
                  Every significant thing I did each day went into my phone. This is the only
                  reason I am able to build this page over three years later. Without those
                  notes, most of these details would have been forgotten within weeks (my memory lowkey sucks).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cities */}
        <div className="jp-section-block">
          <h3 className="jp-section-block-title">Cities &amp; Destinations</h3>
          <p className="jp-placeholder-note">Photos coming. Add one per city when ready.</p>
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
            This page was built in late 2026, over three years after the trip. Most of
            the detail across the site comes from notes I kept in my phone every day I
            was there, along with photos and videos from the trip.
          </p>
        </div>

        {/* Photo disclaimer */}
        <div className="jp-info-footnote jp-info-disclaimer">
          <span className="jp-info-footnote-icon">&#9432;</span>
          <div>
            <p>
              All photos on this page were taken by me unless otherwise credited.
              If you appear in any photo and would prefer to be removed, please{' '}
              <Link href="/#contact">reach out via my contact form</Link>.
            </p>
            <p>
              Higher resolution versions of any image on this page are available upon
              request. Feel free to{' '}
              <Link href="/#contact">get in touch</Link>.
            </p>
          </div>
        </div>

      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     TAB: HIGHLIGHTS
     ══════════════════════════════════════════════════════════ */
  renderHighlightsTab() {
    const { showRule2Popup } = this.state;

    const highlights = [
      {
        id: 'day',
        title: 'Favorite Day',
        subtitle: 'Saturday June 17th',
        date: this.findTripDate('2023-06-17'),
        image: 'https://dl.dropboxusercontent.com/scl/fi/luba4nqpmbpksavgck9bf/DSC_0198.NEF?rlkey=wk1fjjj5kndepbyzjqz1cth6q&st=e3u7kuh9&raw=1',
        desc: (
          <>
            The day I went hiking with a few of the students on the program and one of
            them got air lifted off the mountain.
          </>
        ),
      },
      {
        id: 'thing',
        title: 'Favorite Thing I Did',
        subtitle: 'Friday July 28',
        date: this.findTripDate('2023-07-28'),
        image: 'https://dl.dropboxusercontent.com/scl/fi/erhyrgilocfv82wtmp1mg/Photo-Jul-28-2023-6-33-03-PM.jpg?rlkey=7gdgdwc9s2gwnp2ffd5s3wmf4&st=qtklslo0&raw=1',
        desc: (
          <>
            This is a wacky staple of Japan and I still pat myself on the back for
            going in there by myself.
          </>
        ),
      },
      {
        id: 'excursion',
        title: 'Favorite Class Excursion',
        subtitle: 'Friday July 28',
        date: this.findTripDate('2023-07-28'),
        image: 'https://dl.dropboxusercontent.com/scl/fi/0eouo942fgqhjdh91mtya/DSC_0475.NEF?rlkey=0ehh34dgua23ag7tjb11ia6n7&st=xkcrmbsb&raw=1',
        desc: (
          <>
            A Japanese monk showed us how to whisk our own green tea and perform a
            traditional Japanese tea ceremony.
          </>
        ),
      },
      {
        id: 'stay',
        title: 'Favorite Place I Stayed',
        subtitle: 'Wednesday July 5',
        date: this.findTripDate('2023-07-05'),
        image: 'https://dl.dropboxusercontent.com/scl/fi/bxte82mr5bebl82dam47m/Photo-Jul-05-2023-10-45-02-PM.jpg?rlkey=vv42xku3vm26ec914rcfbdlwt&st=2b8o6oco&raw=1',
        desc: (
          <>
            This is another Japanese staple. I stayed here for one night during my
            week in Tokyo. It is super cheap and super interesting.
          </>
        ),
      },
      {
        id: 'food',
        title: 'Favorite Food',
        subtitle: 'Wednesday July 12',
        date: this.findTripDate('2023-07-12'),
        image: 'https://dl.dropboxusercontent.com/scl/fi/wyt16kuw2ogmqfk7vwnkq/Photo-Jul-12-2023-11-32-03-AM.jpg?rlkey=fe5b6rktc4f9yax5knu7wgvus&st=9aao9bdt&raw=1',
        desc: (
          <>
            So many students on the program would talk about how they were regularly
            eating the nearby Indian food. I never understood it until I tried it
            myself. It was insanely good. I only ate at Namaste once due to{' '}
            <button
              className="jp-rule-inline"
              onClick={(e) => { e.stopPropagation(); this.setState({ showRule2Popup: true }); }}
            >
              Rule 2
            </button>
            , however, I ate at numerous other Indian places because of how much I
            enjoyed it.
          </>
        ),
      },
      {
        id: 'work',
        title: 'Favorite Place to Work on Assignments',
        subtitle: null,
        date: null,
        dates: [
          this.findTripDate('2023-06-07'),
          this.findTripDate('2023-06-08'),
          this.findTripDate('2023-06-10'),
          this.findTripDate('2023-06-12'),
          this.findTripDate('2023-06-22'),
          this.findTripDate('2023-07-20'),
        ].filter(Boolean),
        image: 'https://dl.dropboxusercontent.com/scl/fi/abtkzbtgerqlwubngwy0u/Photo-Jun-12-2023-10-48-18-AM.jpg?rlkey=92vcvfdckot2uzm3679a39ua4&st=recb02mu&raw=1',
        desc: (
          <>
            This place had a lot of table space to chill out and work on assignments.
            They also had a great bathroom. Oh, and donuts too.
          </>
        ),
      },
    ];

    return (
      <div className="jp-content jp-highlights">
        <div className="jp-section-header">
          <h2 className="jp-section-heading">Trip Highlights</h2>
          <p className="jp-section-subheading">
            A curated collection of the best experiences from the trip, the moments
            that stood out the most. Click a date to jump to that day.
          </p>
        </div>
        <div className="jp-highlights-grid">
          {highlights.map(h => (
            <div key={h.id} className="jp-highlight-card">
              {h.image ? (
                <div className="jp-highlight-image-placeholder">
                  <img
                    src={h.image}
                    alt={h.title}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="jp-highlight-image-placeholder">
                  <span className="jp-placeholder-icon">+</span>
                  <span className="jp-placeholder-text">Add Photo</span>
                </div>
              )}
              <div className="jp-highlight-body">
                <h3 className="jp-highlight-title">{h.title}</h3>
                {h.date && (
                  <button
                    className="jp-highlight-date jp-highlight-date-clickable"
                    onClick={() => this.handleDateSelect(h.date)}
                  >
                    {h.subtitle}
                  </button>
                )}
                {h.dates && h.dates.length > 0 && (
                  <div className="jp-highlight-dates-row">
                    {h.dates.map((d, i) => (
                      <span key={d.dateStr}>
                        <button
                          className="jp-highlight-date jp-highlight-date-clickable"
                          onClick={() => this.handleDateSelect(d)}
                        >
                          {d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </button>
                        {i < h.dates.length - 1 && <span className="jp-highlight-date-sep">, </span>}
                      </span>
                    ))}
                  </div>
                )}
                <p className="jp-highlight-desc">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rule 2 popup */}
        {showRule2Popup && (
          <div className="jp-rule-popup-overlay" onClick={() => this.setState({ showRule2Popup: false })}>
            <div className="jp-rule-popup" onClick={e => e.stopPropagation()}>
              <h4 className="jp-rule-popup-title">Rule 2: Never eat at the same place twice</h4>
              <p className="jp-rule-popup-desc">
                Every single day, I had to find a new restaurant or food spot.
                  This pushed me to explore areas I would have otherwise missed. This also helped keep me out of my comfort zone.
              </p>
              <button
                className="jp-rule-popup-close"
                onClick={() => this.setState({ showRule2Popup: false })}
              >
                Got it
              </button>
            </div>
          </div>
        )}
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
    const team = [
      {
        name: 'Ryan Campisi',
        github: 'campisir',
        avatar: 'https://avatars.githubusercontent.com/u/68626778?s=80',
      },
      {
        name: 'Nancy Lucy',
        github: 'nancylucy01',
        avatar: 'https://avatars.githubusercontent.com/u/16230296?s=80',
      },
      {
        name: 'Aidan Winney',
        github: 'aidan-winney',
        avatar: 'https://avatars.githubusercontent.com/u/104330835?s=80',
      },
      {
        name: 'Matthew Darrow',
        github: 'zCriminalArtist',
        avatar: 'https://avatars.githubusercontent.com/u/73550679?s=80',
      },
      {
        name: 'Nic Butakow',
        github: 'butakow',
        avatar: 'https://avatars.githubusercontent.com/u/15271479?s=80',
      },
    ];

    return (
      <div className="jp-content jp-weatherviz">

        {/* Hero */}
        <div className="jp-wv-hero">
          <div className="jp-wv-hero-content">
            <div className="jp-wv-badge">Python Class Project · Summer 2023</div>
            <h2 className="jp-wv-title">WeatherViz</h2>
            <p className="jp-wv-subtitle">
              A desktop application for displaying historical weather data on an
              interactive map with heatmap interpolation and smooth timelapse playback.
              Built as the final project for the Performant Python Programming course
              during the UF study abroad program in Japan.
            </p>
            <div className="jp-wv-links">
              <a
                href="https://github.com/aidan-winney/WeatherViz"
                target="_blank"
                rel="noopener noreferrer"
                className="jp-wv-link primary"
              >
                GitHub
              </a>
              <span className="jp-wv-link secondary" style={{ opacity: 0.45, cursor: 'default' }}>
                Live Demo (coming soon)
              </span>
            </div>
          </div>
          <div className="jp-wv-hero-visual">
            <div className="jp-wv-screenshot-placeholder">Screenshot / Demo GIF</div>
          </div>
        </div>

        <div className="jp-wv-body">

          {/* About */}
          <div className="jp-wv-section">
            <h3 className="jp-wv-section-title">About the Project</h3>
            <p className="jp-wv-desc">
              WeatherViz is a desktop application that lets users query historical weather
              data (temperature, precipitation, wind) for any region and time frame, then
              renders the results as an animated heatmap overlay on a map. The application
              queries the Open-Meteo API for gridded weather data, caches results in a local
              SQLite database, and renders smooth interpolated heatmaps using a Rust backend
              that communicates with the Python frontend via PyO3.
            </p>
            <p className="jp-wv-desc">
              A key constraint of the course was that <strong>no JavaScript was to be
              used</strong>. The entire UI is built with PySide2 (Qt5), and all
              performance-critical rendering is done in Rust compiled as a native Python
              extension module. The map is rendered via folium with a custom overlay
              system, and playback is controlled through a custom date range slider
              with adjustable speed (1x through 8x).
            </p>
          </div>

          {/* Tech stack + Team */}
          <div className="jp-wv-two-col">
            <div className="jp-wv-section">
              <h3 className="jp-wv-section-title">Tech Stack</h3>
              <div className="jp-tech-list">
                {[
                  'Python 3.8',
                  'Rust (PyO3)',
                  'PySide2 (Qt5)',
                  'Raqote (Rust)',
                  'ndarray (Rust)',
                  'SQLite',
                  'Open-Meteo API',
                  'folium',
                  'Pillow',
                  'reqwest (Rust)',
                ].map(t => (
                  <span key={t} className="jp-tech-badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="jp-wv-section">
              <h3 className="jp-wv-section-title">Team</h3>
              <div className="jp-team-list">
                {team.map(member => (
                  <a
                    key={member.github}
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jp-team-member jp-team-clickable"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="jp-member-avatar-img"
                      width="36"
                      height="36"
                    />
                    <div>
                      <span className="jp-member-name">{member.name}</span>
                      <span className="jp-member-gh">@{member.github}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="jp-wv-section">
            <h3 className="jp-wv-section-title">Key Features</h3>
            <div className="jp-features-grid">
              <div className="jp-feature-card">
                <div className="jp-feature-category">Rendering</div>
                <h4 className="jp-feature-name">Heatmap Interpolation</h4>
                <p className="jp-feature-desc">
                  Bilinear interpolation in Rust (powered by ndarray) that maps sparse
                  weather station data onto a smooth pixel-level grid, producing clean
                  gradient heatmaps at any zoom level.
                </p>
              </div>
              <div className="jp-feature-card">
                <div className="jp-feature-category">Playback</div>
                <h4 className="jp-feature-name">Smooth Timelapse</h4>
                <p className="jp-feature-desc">
                  A custom date range slider with play/pause and adjustable speed
                  (1x, 2x, 4x, 8x) lets you watch weather patterns evolve over time
                  as animated heatmap frames.
                </p>
              </div>
              <div className="jp-feature-card">
                <div className="jp-feature-category">Data</div>
                <h4 className="jp-feature-name">Real-Time Querying</h4>
                <p className="jp-feature-desc">
                  Select a time frame and parameter (temperature, rain, or wind),
                  choose between hourly and daily granularity, and query live
                  historical data from the Open-Meteo API.
                </p>
              </div>
              <div className="jp-feature-card">
                <div className="jp-feature-category">Performance</div>
                <h4 className="jp-feature-name">Rust Rendering Backend</h4>
                <p className="jp-feature-desc">
                  All heatmap rendering runs in Rust via PyO3, with a custom
                  configurable color gradient system and opacity controls. The
                  rendering pipeline supports multithreaded frame generation.
                </p>
              </div>
              <div className="jp-feature-card">
                <div className="jp-feature-category">Storage</div>
                <h4 className="jp-feature-name">Query Caching</h4>
                <p className="jp-feature-desc">
                  API results are cached in a local SQLite database. Saved queries
                  persist across sessions, can be replayed instantly, and can be
                  added or deleted from the cache at any time.
                </p>
              </div>
              <div className="jp-feature-card">
                <div className="jp-feature-category">UI</div>
                <h4 className="jp-feature-name">Custom Resizable UI</h4>
                <p className="jp-feature-desc">
                  The entire interface scales dynamically with the window size,
                  including a custom-built date range slider, calendar picker,
                  map pan/zoom controls, and a collapsible query panel.
                </p>
              </div>
            </div>
          </div>

          {/* Code preview */}
          <div className="jp-wv-section">
            <h3 className="jp-wv-section-title">Code Preview</h3>
            <div className="jp-code-preview">
              <pre className="jp-code-block"><code>{`# Python: PySide2 UI + Rust rendering engine (main.py)
from PySide2.QtWidgets import QApplication
from WeatherViz.renderer import Renderer
from WeatherViz.gui.mainwindow import MainWindow

# No JavaScript. The entire UI is Qt5 (PySide2)
# All heatmap rendering runs in Rust, compiled as a native
# Python extension via PyO3 + Maturin

// Rust: Bilinear interpolation core (interp.rs)
pub struct Interpolator {
    xs: Vec<f64>,
    ys: Vec<f64>,
    z: Array2<f64>,    // ndarray-backed grid
}

// Maps a coordinate onto the 2D value grid using bilinear
// interpolation. This is called for every pixel of the heatmap
fn interpolate(&self, x: f64, y: f64) -> f64 {
    let (ix1, ix2) = closest_indices(&self.xs, x);
    let (iy1, iy2) = closest_indices(&self.ys, y);
    // ... bilinear weighting across the 4 surrounding grid points
}`}</code></pre>
            </div>
            <p className="jp-placeholder-note" style={{ marginTop: '10px', marginBottom: 0 }}>
              This snippet is illustrative. Browse the full source on{' '}
              <a
                href="https://github.com/aidan-winney/WeatherViz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--jp-blue)', textDecoration: 'none' }}
              >
                GitHub
              </a>.
            </p>
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
            content="Ryan Campisi's 63-day study abroad trip to Japan in Summer 2023 through the University of Florida: courses, travel, food, and the WeatherViz Python project."
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
