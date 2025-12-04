import React, { Component } from 'react';
import Head from 'next/head';
import { logEvent } from '../src/utils/logging';
import { getTrophyCards } from '../src/Components/Trophies/index';

class Trophies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ff7RebirthActiveTab: 'party',
      lisDeClickedCharacters: [],
      codBocwActiveTab: 'zombies',
      sortBy: 'newest',
      searchQuery: '',
    };
  }

  componentDidMount() {
    // Track page view
    if (window.gtag) {
      window.gtag('config', 'G-HN847L26DC', {
        page_path: '/trophies',
      });
      window.gtag('event', 'page_view', {
        event_category: 'Page View',
        event_label: 'Trophies Page Viewed'
      });
    }
    
    logEvent('Trophies Page View', 'User visited the PlayStation trophies page');
  }

  getTrophySections = () => {
    let cards = getTrophyCards(this.state, (updates) => this.setState(updates));
    
    // Apply search filter
    if (this.state.searchQuery) {
      const query = this.state.searchQuery.toLowerCase();
      cards = cards.filter(card => 
        card.gameTitle?.toLowerCase().includes(query) ||
        card.platinumName?.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    const sortedCards = [...cards].sort((a, b) => {
      switch (this.state.sortBy) {
        case 'newest':
          return b.platinumNumber - a.platinumNumber;
        case 'oldest':
          return a.platinumNumber - b.platinumNumber;
        case 'difficulty-high':
          return b.difficulty - a.difficulty;
        case 'difficulty-low':
          return a.difficulty - b.difficulty;
        case 'enjoyment-high':
          return b.enjoyment - a.enjoyment;
        case 'enjoyment-low':
          return a.enjoyment - b.enjoyment;
        default:
          return b.platinumNumber - a.platinumNumber;
      }
    });
    
    return sortedCards;
  }

  render() {
    const trophySections = this.getTrophySections();
    const { trophyList } = this.props;
    
    // Generate trophy list for meta description
    const trophyNames = trophySections.slice(0, 4).map(t => t.gameTitle).join(', ');
    const description = `Explore my collection of ${trophySections.length} PlayStation Platinum trophies including ${trophyNames}, and more!`;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>PlayStation Trophies | Ryan Campisi</title>
          <meta name="description" content={description} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.ryancampisi.com/trophies" />
          <meta property="og:title" content="PlayStation Platinum Trophies | Ryan Campisi" />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="https://www.ryancampisi.com/images/trophies/ff7rebirth-bg.webp" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ryancampisi.com/trophies" />
          <meta name="twitter:title" content="PlayStation Platinum Trophies | Ryan Campisi" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content="https://www.ryancampisi.com/images/trophies/ff7rebirth-bg.webp" />
          
          {/* Structured Data for Search Engines */}
          <script type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "PlayStation Platinum Trophy Collection",
                "description": description,
                "author": {
                  "@type": "Person",
                  "name": "Ryan Campisi",
                  "url": "https://www.ryancampisi.com"
                },
                "numberOfItems": trophySections.length
              })
            }}
          />
        </Head>
        
        <div className="trophies-page">
          {/* Static content for search engines and bots */}
          <div className="seo-content" style={{ position: 'absolute', left: '-9999px' }}>
            <h1>Ryan Campisi - PlayStation Platinum Trophy Collection</h1>
            <p>Complete list of {trophyList?.length || 0} PlayStation Platinum trophies earned:</p>
            <ul>
              {trophyList?.map(trophy => (
                <li key={trophy.id}>
                  <strong>{trophy.gameTitle}</strong> - "{trophy.platinumName}" 
                  {trophy.platinumNumber && ` - Platinum #${trophy.platinumNumber}`}
                  {trophy.difficulty && ` - Difficulty: ${trophy.difficulty}/10`}
                  {trophy.enjoyment && ` - Enjoyment: ${trophy.enjoyment}/10`}
                  {trophy.completedDate && ` - Completed: ${new Date(trophy.completedDate).toLocaleDateString()}`}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="trophies-header">
            <h1>PlayStation Platinum Trophies</h1>
            <p className="trophies-subtitle">
              My journey through some of gaming's greatest experiences.
            </p>
            <div className="trophy-stats">
              <div className="stat">
                <span className="stat-number">{trophySections.length}</span>
                <span className="stat-label">Platinums</span>
              </div>
            </div>
            
            {/* Search and Sort Controls */}
            <div className="trophy-controls">
              {/* Search Bar */}
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by game or trophy name..."
                  value={this.state.searchQuery}
                  onChange={(e) => this.setState({ searchQuery: e.target.value })}
                  className="search-input"
                />
                {this.state.searchQuery && (
                  <button
                    onClick={() => this.setState({ searchQuery: '' })}
                    className="clear-search"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {/* Sort Dropdown */}
              <div className="sort-container">
                <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                <select
                  id="sort-select"
                  value={this.state.sortBy}
                  onChange={(e) => this.setState({ sortBy: e.target.value })}
                  className="sort-select"
                >
                  <option value="newest">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="difficulty-high">Difficulty (High to Low)</option>
                  <option value="difficulty-low">Difficulty (Low to High)</option>
                  <option value="enjoyment-high">Enjoyment (High to Low)</option>
                  <option value="enjoyment-low">Enjoyment (Low to High)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="trophies-grid">
            {trophySections.map((section) => (
              <div key={section.id} className="trophy-card">
                <div className="trophy-image-container">
                  <img 
                    src={section.backgroundImage} 
                    alt={`${section.id} background`}
                    className="game-gif"
                    onError={(e) => {
                      e.target.src = 'images/portfolio/placeholder.jpg';
                    }}
                  />
                </div>
                
                <div className="trophy-content">
                  {section.platinumNumber && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      fontSize: '0.9em',
                      fontWeight: '600',
                      color: 'rgba(0, 0, 0, 0.25)',
                      zIndex: 10
                    }}>
                      #{section.platinumNumber}
                    </div>
                  )}
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="trophies-footer">
            <p>Trophy hunting is more than just collecting achievements - it's about experiencing games to their fullest and appreciating the craft behind them.</p>
          </div>
        </div>
      </>
    );
  }
}

export async function getStaticProps() {
  // Import trophy cards to generate static HTML at build time
  const { getTrophyCards } = require('../src/Components/Trophies/index');
  
  // Get initial state for trophy cards
  const initialState = {
    ff7RebirthActiveTab: 'party',
    lisDeClickedCharacters: [],
    codBocwActiveTab: 'zombies',
    sortBy: 'newest',
    searchQuery: '',
  };
  
  // Get all trophy cards with a no-op setState
  const trophyCards = getTrophyCards(initialState, () => {});
  
  // Extract basic info for static HTML
  const trophyList = trophyCards.map(card => ({
    id: card.id,
    gameTitle: card.gameTitle,
    platinumName: card.platinumName,
    platinumNumber: card.platinumNumber,
    difficulty: card.difficulty,
    enjoyment: card.enjoyment,
    completedDate: card.completedDate ? card.completedDate.toISOString() : null,
  }));
  
  return {
    props: {
      trophyList,
    },
  };
}

export default Trophies;
