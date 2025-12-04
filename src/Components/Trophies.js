import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import './Trophies.css';
import { logEvent } from '../utils/logging';
import { getTrophyCards } from './Trophies/index';

class Trophies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ff7RebirthActiveTab: 'party', // 'party', 'minigames', 'enemies'
      lisDeClickedCharacters: [], // Track which characters have been clicked
      codBocwActiveTab: 'zombies', // 'zombies', 'multiplayer'
      
      // Sorting and filtering state
      sortBy: 'newest', // 'newest', 'oldest', 'difficulty-high', 'difficulty-low', 'enjoyment-high', 'enjoyment-low'
      searchQuery: '', // Search term for filtering
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

  /**
   * Get all trophy sections from the registry
   * Trophy cards are now defined in separate files in the Trophies/cards/ directory
   */
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
          return b.platinumNumber - a.platinumNumber; // Higher number = more recent
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
    
    // Generate trophy list for meta description
    const trophyNames = trophySections.slice(0, 4).map(t => t.gameTitle).join(', ');
    const description = `Explore my collection of ${trophySections.length} PlayStation Platinum trophies including ${trophyNames}, and more!`;

    return (
      <div className="trophies-page">
        <Helmet>
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
          <script type="application/ld+json">
            {JSON.stringify({
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
            })}
          </script>
        </Helmet>
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
    );
  }
}

export default Trophies;
