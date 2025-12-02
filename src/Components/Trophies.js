import React, { Component } from 'react';
import './Trophies.css';
import { logEvent } from '../utils/logging';

class Trophies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ff7RebirthActiveTab: 'party', // 'party', 'minigames', 'enemies'
      lisDeClickedCharacters: [] // Track which characters have been clicked
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
                href="https://psnprofiles.com/guide/18935-final-fantasy-vii-rebirth-trophy-guide" 
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
                    onClick={() => this.setState({ ff7RebirthActiveTab: 'enemies' })}
                    style={{
                      padding: '12px 24px',
                      fontSize: '1em',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: this.state.ff7RebirthActiveTab === 'enemies' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#f8f9fa',
                      color: this.state.ff7RebirthActiveTab === 'enemies' ? 'white' : '#495057',
                      boxShadow: this.state.ff7RebirthActiveTab === 'enemies' 
                        ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                        : 'none'
                    }}
                  >
                    Enemies
                  </button>
                </div>

                {/* Tab Content */}
                <h4 style={{ 
                  fontSize: '1.5em', 
                  marginBottom: '20px', 
                  textAlign: 'center',
                  color: '#2c3e50'
                }}>
                  {this.state.ff7RebirthActiveTab === 'party' && 'All Party Members Ranked (Combat)'}
                  {this.state.ff7RebirthActiveTab === 'minigames' && 'My Top 5 Favorite Mini Games'}
                  {this.state.ff7RebirthActiveTab === 'enemies' && 'Top 5 Enemies with the Most Aura'}
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
                        alt="Queen's Blood"
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
                        alt="Junon Parade"
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
                        2. Junon Parade
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame3.webp" 
                        alt="Loveless"
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
                        3. Loveless
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame4.avif" 
                        alt="Fall Guys"
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
                        4. Fall Guys
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-minigame5.avif" 
                        alt="Rocket League"
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
                        5. Rocket League
                      </div>
                    </div>
                  </div>
                )}

                {/* Enemies Tab */}
                {this.state.ff7RebirthActiveTab === 'enemies' && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '20px'
                  }}>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-enemy1.webp" 
                        alt="Kid G"
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
                        1. Kid G
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-enemy2.jpg" 
                        alt="Sephiroth"
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
                        2. Sephiroth
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-enemy3.jpg" 
                        alt="Gilgamesh"
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
                        3. Gilgamesh
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-enemy4.jpeg" 
                        alt="Odin"
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
                        4. Odin
                      </div>
                    </div>
                    <div className="character-card">
                      <img 
                        src="images/trophies/ff7rebirth-enemy5.webp" 
                        alt="Tonberry King"
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
                        5. Tonberry King
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
                        SHADOWY CHAINS!!! This legit took me like ten hours. 
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
                        Walking🚶city🌇streets🛣️with😩worn❌cobblestones🪨... listening🎧to😳people👯rushing🏃‍➡️past😭to🥺rhythms🎵all😲their👆own😞...
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
      
      // Life is Strange: Double Exposure
      {
        id: 'lis-double-exposure',
        platinumNumber: 89,
        backgroundImage: 'images/trophies/lis-de-bg.jpg',
        content: (
          <>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h3 className="game-title" style={{ marginBottom: '10px' }}>
                Life is Strange: Double Exposure
              </h3>
              <a 
                href="https://psnprofiles.com/guide/20861-life-is-strange-double-exposure-trophy-guide" 
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
                  "Picture Perfect"
                </p>
              </a>
              <img 
                src="images/trophies/lis-de-platinum.png" 
                alt="Picture Perfect Platinum Trophy"
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
                <span>📅 Started: October 5, 2025</span>
                <span>✅ Completed: October 9, 2025</span>
                <span>⏱️ 21 hours</span>
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
                  <span>0/10</span>
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
                  <span>5/10</span>
                </div>
              </div>
            </div>
            <div className="custom-content">
              {/* Interactive Character Game */}
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ 
                  fontSize: '1.5em', 
                  marginBottom: '20px', 
                  textAlign: 'center',
                  color: '#2c3e50'
                }}>
                  Guess Which Character is Straight!
                </h4>
                <p style={{ 
                  textAlign: 'center', 
                  marginBottom: '25px',
                  fontSize: '1em',
                  color: '#6c757d'
                }}>
                  Listed below are the main characters from Life is Strange: Double Exposure. Guess which of them is not part of the LGBTQ+!
                </p>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '20px'
                }}>
                  {[
                    { id: 1, name: 'Max', image: 'images/trophies/lis-de-char1.webp' },
                    { id: 2, name: 'Safi', image: 'images/trophies/lis-de-char2.webp' },
                    { id: 3, name: 'Amanda', image: 'images/trophies/lis-de-char3.jpeg' },
                    { id: 4, name: 'Moses', image: 'images/trophies/lis-de-char4.avif' },
                    { id: 5, name: 'Vinh', image: 'images/trophies/lis-de-char5.webp' },
                    { id: 6, name: 'Gwen', image: 'images/trophies/lis-de-char6.webp' },
                    { id: 7, name: 'Reggie', image: 'images/trophies/lis-de-char7.webp' }
                  ].map((character) => (
                    <div 
                      key={character.id}
                      onClick={() => {
                        if (!this.state.lisDeClickedCharacters.includes(character.id)) {
                          this.setState({
                            lisDeClickedCharacters: [...this.state.lisDeClickedCharacters, character.id]
                          });
                        }
                      }}
                      style={{
                        position: 'relative',
                        cursor: this.state.lisDeClickedCharacters.includes(character.id) ? 'default' : 'pointer',
                        transition: 'transform 0.2s ease',
                        transform: this.state.lisDeClickedCharacters.includes(character.id) ? 'none' : 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (!this.state.lisDeClickedCharacters.includes(character.id)) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <img 
                        src={character.image}
                        alt={character.name}
                        style={{ 
                          width: '100%', 
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      />
                      {this.state.lisDeClickedCharacters.includes(character.id) && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '12px'
                        }}>
                          <div style={{
                            fontSize: '100px',
                            color: '#dc3545',
                            fontWeight: '900',
                            textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                            opacity: 0.7
                          }}>
                            ✗
                          </div>
                        </div>
                      )}
                      <div style={{ 
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.1em',
                        color: '#667eea',
                        marginTop: '10px'
                      }}>
                        {character.name}
                      </div>
                    </div>
                  ))}
                </div>

                {this.state.lisDeClickedCharacters.length > 0 && (() => {
                  const characterMessages = {
                    1: "You can romance Amanda.",
                    2: "She's into Max...",
                    3: "She's as lesbian as it gets.",
                    4: "Moses has a boyfriend in the game.",
                    5: "This guy was talking about how he finds Moses hot.",
                    6: "Trans + Lesbian.",
                    7: "Super gay."
                  };
                  
                  const lastClicked = this.state.lisDeClickedCharacters[this.state.lisDeClickedCharacters.length - 1];
                  const isAllClicked = this.state.lisDeClickedCharacters.length === 7;
                  
                  return (
                    <div style={{
                      marginTop: '30px',
                      padding: '20px',
                      background: isAllClicked 
                        ? 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(255, 99, 132, 0.1) 100%)',
                      borderRadius: '12px',
                      borderLeft: '4px solid #dc3545',
                      textAlign: 'center'
                    }}>
                      {isAllClicked ? (
                        <>
                          <p style={{ 
                            fontSize: '1.2em', 
                            fontWeight: '700',
                            color: '#dc3545',
                            marginBottom: '10px'
                          }}>
                            Plot Twist! 🎭
                          </p>
                          <p style={{ 
                            fontSize: '1.1em', 
                            lineHeight: '1.8',
                            color: '#2c3e50',
                            margin: 0
                          }}>
                            You must have forgotten that this is Life is Strange! There are no straight characters! 💯
                          </p>
                        </>
                      ) : (
                        <>
                          <p style={{ 
                            fontSize: '1.2em', 
                            fontWeight: '700',
                            color: '#dc3545',
                            marginBottom: '10px'
                          }}>
                            Incorrect! ❌
                          </p>
                          <p style={{ 
                            fontSize: '1.1em', 
                            lineHeight: '1.8',
                            color: '#2c3e50',
                            margin: 0
                          }}>
                            {characterMessages[lastClicked]}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })()}
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
                  This was the weakest Life is Strange game, in my opinion (besides Before the Storm). Nothing really makes sense and the entire game takes place in like three locations. I enjoyed the music, though.
                </p>
              </div>
            </div>
          </>
        )
      },
      // Final Fantasy VII Remake
      {
        id: 'ff7',
        platinumNumber: 88,
        backgroundImage: 'images/trophies/ff7-bg.jpg',
        content: (
          <>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h3 className="game-title" style={{ marginBottom: '10px' }}>
                Final Fantasy VII Remake
              </h3>
              <a 
                href="https://psnprofiles.com/guide/9997-final-fantasy-vii-remake-trophy-guide" 
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
                  "Master of Fate"
                </p>
              </a>
              <img 
                src="images/trophies/ff7-platinum.png" 
                alt="Master of Fate Platinum Trophy"
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
                <span>📅 Started: January 13, 2024</span>
                <span>✅ Completed: September 13, 2025</span>
                <span>⏱️ 94 hours</span>
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
                  <span>6/10</span>
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
                  <span>7/10</span>
                </div>
              </div>
            </div>
            <div className="custom-content">
              <h4 style={{ marginBottom: '15px', fontSize: '1.2em', textAlign: 'center' }}>
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
                  The character development in this remake is phenomenal. This was my introduction to the FF7 world and it made me fall in love with the series. Can't wait for Part 3!
                </p>
              </div>
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