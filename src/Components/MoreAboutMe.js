import React, { Component } from 'react';
import Travel from './Travel';
import MyChess from './MyChess';
import Philosophy from './Philosophy';

class MoreAboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'travel', // 'travel', 'chess', 'philosophy'
    };
  }

  setActiveTab = (tab) => {
    // Track tab navigation
    if (window.gtag) {
      window.gtag('event', 'tab_click', {
        event_category: 'User Interaction',
        event_label: `More About Me - ${tab}`,
        tab_name: tab
      });
    }

    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <section id="more-about-me">
        <h1 className="section-title">More About Me</h1>
        
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'travel' ? 'active' : ''}`}
            onClick={() => this.setActiveTab('travel')}
          >
            Travel
          </button>
          <button 
            className={`tab-button ${activeTab === 'chess' ? 'active' : ''}`}
            onClick={() => this.setActiveTab('chess')}
          >
            Chess
          </button>
          <button 
            className={`tab-button ${activeTab === 'philosophy' ? 'active' : ''}`}
            onClick={() => this.setActiveTab('philosophy')}
          >
            Philosophy
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'travel' && <Travel />}
          {activeTab === 'chess' && (
            <MyChess
              dialogue="Play my Chess Bot!!"
              chessGame={this.props.chessGame}
              onPieceDrop={this.props.onPieceDrop}
            />
          )}
          {activeTab === 'philosophy' && (
            <Philosophy
              philosophyMessage="What is the meaning of life?"
            />
          )}
        </div>
      </section>
    );
  }
}

export default MoreAboutMe;
