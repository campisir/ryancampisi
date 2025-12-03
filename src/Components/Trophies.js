import React, { Component } from 'react';
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

    return (
      <div className="trophies-page">
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
