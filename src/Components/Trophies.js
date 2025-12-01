import React, { Component } from 'react';
import './Trophies.css';
import { logEvent } from '../utils/logging';

class Trophies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ff7RebirthActiveTab: 'party' // 'party', 'minigames', 'regions'
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

  // Define your custom trophy sections here
  // Each can have completely different content and layout
  getTrophySections = () => {
    return [
      // Final Fantasy VII Rebirth - Full Custom Showcase
      {
        id: 'ff7-rebirth',
        platinumNumber: 90,
        backgroundImage: 'images/trophies/ff7rebirth-bg.webp',
        content: (
          <>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h3 className="game-title" style={{ marginBottom: '10px' }}>
                Final Fantasy VII Rebirth
              </h3>
              <a 
                href="https://psnprofiles.com/trophies/YOUR-GAME-ID-HERE" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#667eea',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#764ba2'}
                onMouseOut={(e) => e.currentTarget.style.color = '#667eea'}
              >
                <p className="platinum-name" style={{ fontSize: '1.4em', marginBottom: '15px', cursor: 'pointer' }}>
                  "The Planet's Hope"
                </p>
              </a>
              <img 
                src="images/trophies/ff7rebirth-platinum.jpg" 
                alt="The Planet's Hope Platinum Trophy"
                style={{ 
                  width: '120px', 
                  height: '120px',
                  marginBottom: '15px',
                  filter: 'drop-shadow(0 4px 12px rgba(255, 215, 0, 0.6))'
                }}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '30px',
                flexWrap: 'wrap',
                marginBottom: '15px',
                fontSize: '0.95em'
              }}>
                <span>📅 Started: October 8, 2025</span>
                <span>✅ Completed: November 24, 2025</span>
                <span>⏱️ 165 hours</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '40px',
                flexWrap: 'wrap',
                marginTop: '15px',
                fontSize: '1em'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  borderRadius: '20px',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  <span>⚔️ Difficulty:</span>
                  <span>7/10</span>
                </div>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  <span>⭐ Enjoyment:</span>
                  <span>10/10</span>
                </div>
              </div>
            </div>

            <div className="custom-content">
              {/* Tabbed Top 5 Section */}
              <div style={{ marginBottom: '40px' }}>
                {/* Tab Navigation */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '25px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => this.setState({ ff7RebirthActiveTab: 'party' })}
                    style={{
                      padding: '12px 24px',
                      fontSize: '1em',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: this.state.ff7RebirthActiveTab === 'party' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#f8f9fa',
                      color: this.state.ff7RebirthActiveTab === 'party' ? 'white' : '#495057',
                      boxShadow: this.state.ff7RebirthActiveTab === 'party' 
                        ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                        : 'none'
                    }}
                  >
                    Party Members
                  </button>
                  <button
                    onClick={() => this.setState({ ff7RebirthActiveTab: 'minigames' })}
                    style={{
                      padding: '12px 24px',
                      fontSize: '1em',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: this.state.ff7RebirthActiveTab === 'minigames' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#f8f9fa',
                      color: this.state.ff7RebirthActiveTab === 'minigames' ? 'white' : '#495057',
                      boxShadow: this.state.ff7RebirthActiveTab === 'minigames' 
                        ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                        : 'none'
                    }}
                  >
                    Mini Games
                  </button>
                  <button
                    onClick={() => this.setState({ ff7RebirthActiveTab: 'regions' })}
                    style={{
                      padding: '12px 24px',
                      fontSize: '1em',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: this.state.ff7RebirthActiveTab === 'regions' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#f8f9fa',
                      color: this.state.ff7RebirthActiveTab === 'regions' ? 'white' : '#495057',
                      boxShadow: this.state.ff7RebirthActiveTab === 'regions' 
                        ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                        : 'none'
                    }}
                  >
                    Regions
                  </button>
                </div>

                {/* Tab Content */}
                <h4 style={{ 
                  fontSize: '1.5em', 
                  marginBottom: '20px', 
                  textAlign: 'center',
                  color: '#2c3e50'
                }}>
                  {this.state.ff7RebirthActiveTab === 'party' && 'All Party Members Ranked'}
                  {this.state.ff7RebirthActiveTab === 'minigames' && 'My Top 5 Favorite Mini Games'}
                  {this.state.ff7RebirthActiveTab === 'regions' && 'All Regions Ranked'}
                </h4>

                {/* Party Members Tab */}
                {this.state.ff7RebirthActiveTab === 'party' && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '20px'
                  }}>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-char1.jpeg" 
                        alt="Yuffie"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        1. Yuffie
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-char2.jpg" 
                        alt="Red XIII"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        2. Red XIII
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-char3.jpeg" 
                        alt="Cloud"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        3. Cloud
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-char4.jpg" 
                        alt="Aerith"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        4. Aerith
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-char5.jpeg" 
                        alt="Barret"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        5. Barret
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-char6.webp" 
                        alt="Tifa"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        6. Cait Sith
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-char7.webp" 
                        alt="Cait Sith"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        7. Tifa
                      </div>
                    </div>
                  </div>
                )}

                {/* Mini Games Tab */}
                {this.state.ff7RebirthActiveTab === 'minigames' && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '20px'
                  }}>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame1.jpg" 
                        alt="Mini Game 1"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        1. Queen's Blood
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame2.jpg" 
                        alt="Mini Game 2"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        2. Chocobo Racing
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame3.jpg" 
                        alt="Mini Game 3"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        3. Piano
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame4.jpg" 
                        alt="Mini Game 4"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        4. G-Bike
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame5.jpg" 
                        alt="Mini Game 5"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        5. Gears & Gambits
                      </div>
                    </div>
                  </div>
                )}

                {/* Regions Tab */}
                {this.state.ff7RebirthActiveTab === 'regions' && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '20px'
                  }}>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-region1.jpg" 
                        alt="Region 1"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        1. Corel
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-region2.jpg" 
                        alt="Region 2"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        2. Nibel
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-region3.jpg" 
                        alt="Region 3"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        3. Grasslands
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-region4.jpg" 
                        alt="Region 4"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        4. Gongaga
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-region5.jpg" 
                        alt="Region 5"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        5. Junon
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-region6.jpg" 
                        alt="Region 6"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        6. Cosmo Canyon
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-region7.jpg" 
                        alt="Region 7"
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '10px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea'
                      }}>
                        7. Meridian Ocean
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Top 5 Mini Games Section */}
              <h4 style={{ 
                fontSize: '1.5em', 
                marginBottom: '20px', 
                textAlign: 'center',
                color: '#2c3e50'
              }}>
                Top 5 Hardest Things About the Rebirth Plat
              </h4>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div className="minigame-item">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ 
                      fontSize: '2em', 
                      fontWeight: '700',
                      color: '#ffd700',
                      minWidth: '40px'
                    }}>
                      1.
                    </span>
                    <img 
                      src="images/trophies/ff7rebirth-gif1.gif" 
                      alt="Mini Game 1"
                      style={{ 
                        width: '150px', 
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1.1em', marginBottom: '5px' }}>
                        Rulers of the Outer Worlds
                      </div>
                      <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                        This legit took me like ten hours. 
                      </div>
                    </div>
                  </div>
                </div>

                <div className="minigame-item">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ 
                      fontSize: '2em', 
                      fontWeight: '700',
                      color: '#c0c0c0',
                      minWidth: '40px'
                    }}>
                      2.
                    </span>
                    <img 
                      src="images/trophies/ff7rebirth-gif2.gif" 
                      alt="Mini Game 2"
                      style={{ 
                        width: '150px', 
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1.1em', marginBottom: '5px' }}>
                        Fort Condor Hard Mode
                      </div>
                      <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                        I'm a certified Fort Condor hater.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="minigame-item">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ 
                      fontSize: '2em', 
                      fontWeight: '700',
                      color: '#cd7f32',
                      minWidth: '40px'
                    }}>
                      3.
                    </span>
                    <img 
                      src="images/trophies/ff7rebirth-gif3.gif" 
                      alt="Mini Game 3"
                      style={{ 
                        width: '150px', 
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1.1em', marginBottom: '5px' }}>
                        Bonds of Friendship & To Be a Hero
                      </div>
                      <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                        Not as bad as people say but still not easy by any means.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="minigame-item">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ 
                      fontSize: '2em', 
                      fontWeight: '700',
                      color: '#667eea',
                      minWidth: '40px'
                    }}>
                      4.
                    </span>
                    <img 
                      src="images/trophies/ff7rebirth-gif4.gif" 
                      alt="Mini Game 4"
                      style={{ 
                        width: '150px', 
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1.1em', marginBottom: '5px' }}>
                        3D Brawler
                      </div>
                      <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                        The last couple fights took me forever.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="minigame-item">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ 
                      fontSize: '2em', 
                      fontWeight: '700',
                      color: '#667eea',
                      minWidth: '40px'
                    }}>
                      5.
                    </span>
                    <img 
                      src="images/trophies/ff7rebirth-gif5.gif" 
                      alt="Mini Game 5"
                      style={{ 
                        width: '150px', 
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1.1em', marginBottom: '5px' }}>
                        Moving on to Another Game
                      </div>
                      <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                        Walking city streets with worn cobblestones... listening to people rushing past to rhythms all their own...
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Review */}
              <div style={{
                marginTop: '30px',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea'
              }}>
                <p style={{ 
                  fontSize: '1.1em', 
                  lineHeight: '1.8',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  This game blew me away. This is what a video game should be. On the first playthrough, the fun never stops. After you beat the game, the difficulty of the endgame content feels super rewarding. This is now one of my favorite game of all time.
                </p>
              </div>
            </div>
          </>
        )
      },
      
      // Example 2: Life is Strange - GIF showcase
      {
        id: 'life-is-strange',
        platinumNumber: 2,
        backgroundImage: 'images/trophies/lis-bg.jpg',
        content: (
          <>
            <h3 className="game-title">Life is Strange</h3>
            <p className="platinum-name">"Butterfly Effect"</p>
            <div className="custom-content">
              <p style={{ marginBottom: '15px' }}>My Favorite Moment:</p>
              <img 
                src="images/trophies/lis-favorite-moment.gif" 
                alt="Life is Strange moment"
                style={{ 
                  width: '100%', 
                  maxWidth: '500px', 
                  borderRadius: '10px',
                  marginBottom: '15px'
                }}
              />
              <p style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
                The lighthouse scene still gives me chills. This game proves that 
                video games can be profound storytelling experiences.
              </p>
            </div>
          </>
        )
      },
      // Example 3: Final Fantasy VII - Character ranking
      {
        id: 'ff7',
        platinumNumber: 45,
        backgroundImage: 'images/trophies/ff7-bg.jpg',
        content: (
          <>
            <h3 className="game-title">Final Fantasy VII Remake</h3>
            <p className="platinum-name">"Master of Fate"</p>
            <div className="custom-content">
              <h4 style={{ marginBottom: '15px', fontSize: '1.2em' }}>
                My Top 5 Characters
              </h4>
              <div className="character-ranking">
                <div className="rank-item">
                  <span className="rank-number">1.</span>
                  <span className="character-name">Aerith</span>
                </div>
                <div className="rank-item">
                  <span className="rank-number">2.</span>
                  <span className="character-name">Tifa</span>
                </div>
                <div className="rank-item">
                  <span className="rank-number">3.</span>
                  <span className="character-name">Cloud</span>
                </div>
                <div className="rank-item">
                  <span className="rank-number">4.</span>
                  <span className="character-name">Barret</span>
                </div>
                <div className="rank-item">
                  <span className="rank-number">5.</span>
                  <span className="character-name">Red XIII</span>
                </div>
              </div>
              <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
                The character development in this remake is phenomenal. Can't wait 
                for Part 2!
              </p>
            </div>
          </>
        )
      },
      // Example 4: Bloodborne - Stats showcase
      {
        id: 'bloodborne',
        platinumNumber: 12,
        backgroundImage: 'images/trophies/bloodborne-bg.jpg',
        content: (
          <>
            <h3 className="game-title">Bloodborne</h3>
            <p className="platinum-name">"Yharnam, Pthumerian Queen"</p>
            <div className="custom-content">
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div className="stat-box">
                  <div className="stat-value">68</div>
                  <div className="stat-label">Hours</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">147</div>
                  <div className="stat-label">Deaths</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">23</div>
                  <div className="stat-label">Bosses</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">6.9%</div>
                  <div className="stat-label">Rarity</div>
                </div>
              </div>
              <p style={{ lineHeight: '1.6', textAlign: 'center' }}>
                The most challenging platinum I've earned. Every death was a lesson, 
                and every victory was earned.
              </p>
            </div>
          </>
        )
      }
    ];
  };

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