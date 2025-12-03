import React from 'react';

export const FF7RebirthCard = (state, setState) => ({
  id: 'ff7-rebirth',
  platinumNumber: 90,
  gameTitle: 'Final Fantasy VII Rebirth',
  platinumName: 'The Planet\'s Hope',
  difficulty: 7,
  enjoyment: 10,
  completedDate: new Date('2025-11-24'),
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
              onClick={() => setState({ ff7RebirthActiveTab: 'party' })}
              style={{
                padding: '12px 24px',
                fontSize: '1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: state.ff7RebirthActiveTab === 'party' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f8f9fa',
                color: state.ff7RebirthActiveTab === 'party' ? 'white' : '#495057',
                boxShadow: state.ff7RebirthActiveTab === 'party' 
                  ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                  : 'none'
              }}
            >
              Party Members
            </button>
            <button
              onClick={() => setState({ ff7RebirthActiveTab: 'minigames' })}
              style={{
                padding: '12px 24px',
                fontSize: '1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: state.ff7RebirthActiveTab === 'minigames' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f8f9fa',
                color: state.ff7RebirthActiveTab === 'minigames' ? 'white' : '#495057',
                boxShadow: state.ff7RebirthActiveTab === 'minigames' 
                  ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                  : 'none'
              }}
            >
              Mini Games
            </button>
            <button
              onClick={() => setState({ ff7RebirthActiveTab: 'enemies' })}
              style={{
                padding: '12px 24px',
                fontSize: '1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: state.ff7RebirthActiveTab === 'enemies' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f8f9fa',
                color: state.ff7RebirthActiveTab === 'enemies' ? 'white' : '#495057',
                boxShadow: state.ff7RebirthActiveTab === 'enemies' 
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
            {state.ff7RebirthActiveTab === 'party' && 'All Party Members Ranked (Combat)'}
            {state.ff7RebirthActiveTab === 'minigames' && 'My Top 5 Favorite Mini Games'}
            {state.ff7RebirthActiveTab === 'enemies' && 'Top 5 Enemies with the Most Aura'}
          </h4>

          {/* Party Members Tab */}
          {state.ff7RebirthActiveTab === 'party' && (
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
          {state.ff7RebirthActiveTab === 'minigames' && (
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
          {state.ff7RebirthActiveTab === 'enemies' && (
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
});
