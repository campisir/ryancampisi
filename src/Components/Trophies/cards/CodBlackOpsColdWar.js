import React from 'react';

export const CodBlackOpsColdWarCard = (state, setState) => ({
  id: 'cod-black-ops-cold-war',
  platinumNumber: 87,
  gameTitle: 'Call of Duty: Black Ops Cold War',
  platinumName: 'Platinum',
  difficulty: 5,
  enjoyment: 7,
  completedDate: new Date('2025-05-24'),
  backgroundImage: 'images/trophies/cod-bocw-bg.jpg',
  
  content: (
    <>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 className="game-title" style={{ marginBottom: '10px' }}>
          Call of Duty: Black Ops Cold War
        </h3>
        
        <a 
          href="https://psnprofiles.com/guide/11174-call-of-duty-black-ops-cold-war-trophy-guide" 
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
            "Platinum"
          </p>
        </a>
        
        <img 
          src="images/trophies/cod-bocw-platinum.png" 
          alt="Platinum Trophy"
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
          <span>📅 Started: August 20, 2024</span>
          <span>✅ Completed: May 24, 2025</span>
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
            <span>5/10</span>
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
        {/* Tabbed Section - Zombies and Multiplayer */}
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
              onClick={() => setState({ codBocwActiveTab: 'zombies' })}
              style={{
                padding: '12px 24px',
                fontSize: '1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: state.codBocwActiveTab === 'zombies' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f8f9fa',
                color: state.codBocwActiveTab === 'zombies' ? 'white' : '#495057',
                boxShadow: state.codBocwActiveTab === 'zombies' 
                  ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                  : 'none'
              }}
            >
              🧟 Zombies Maps
            </button>
            <button
              onClick={() => setState({ codBocwActiveTab: 'multiplayer' })}
              style={{
                padding: '12px 24px',
                fontSize: '1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: state.codBocwActiveTab === 'multiplayer' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f8f9fa',
                color: state.codBocwActiveTab === 'multiplayer' ? 'white' : '#495057',
                boxShadow: state.codBocwActiveTab === 'multiplayer' 
                  ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                  : 'none'
              }}
            >
              🎮 Multiplayer
            </button>
          </div>

          {/* Tab Content */}
          <h4 style={{ 
            fontSize: '1.5em', 
            marginBottom: '20px', 
            textAlign: 'center',
            color: '#2c3e50'
          }}>
            {state.codBocwActiveTab === 'zombies' && 'Zombies Maps Ranked'}
            {state.codBocwActiveTab === 'multiplayer' && 'Multiplayer Highlights'}
          </h4>

          {/* Zombies Tab */}
          {state.codBocwActiveTab === 'zombies' && (
            <div>
              {/* Zombies Veteran Badge */}
              <div style={{
                marginBottom: '25px',
                padding: '15px 20px',
                background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.15) 100%)',
                borderRadius: '12px',
                borderLeft: '4px solid #ffc107',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '1em', 
                  lineHeight: '1.6',
                  color: '#2c3e50',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  🏆 <strong>Zombies Veteran</strong> - While technically not required for the platinum, I did complete all the zombies easter eggs because I am a sigma zombies veteran.
                </p>
              </div>

              {/* Maps Ranking */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  gap: '15px'
                }}>
                  <span style={{ 
                    fontSize: '1.5em', 
                    fontWeight: '700',
                    color: '#ffd700',
                    minWidth: '40px'
                  }}>
                    1.
                  </span>
                  <img 
                    src="images/trophies/bocw-map1.avif" 
                    alt="Map 1"
                    style={{ 
                      width: '120px', 
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '1.1em', color: '#2c3e50' }}>
                      Mauer Der Toten
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                      Klaus has aura.
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  gap: '15px'
                }}>
                  <span style={{ 
                    fontSize: '1.5em', 
                    fontWeight: '700',
                    color: '#c0c0c0',
                    minWidth: '40px'
                  }}>
                    2.
                  </span>
                  <img 
                    src="images/trophies/bocw-map2.jpg" 
                    alt="Map 2"
                    style={{ 
                      width: '120px', 
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '1.1em', color: '#2c3e50' }}>
                      Outbreak
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                      I'm lowkey an Outbreak fan.
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  gap: '15px'
                }}>
                  <span style={{ 
                    fontSize: '1.5em', 
                    fontWeight: '700',
                    color: '#cd7f32',
                    minWidth: '40px'
                  }}>
                    3.
                  </span>
                  <img 
                    src="images/trophies/bocw-map3.webp" 
                    alt="Map 3"
                    style={{ 
                      width: '120px', 
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '1.1em', color: '#2c3e50' }}>
                      Die Maschine
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                      I mean it's alright.
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  gap: '15px'
                }}>
                  <span style={{ 
                    fontSize: '1.5em', 
                    fontWeight: '700',
                    color: '#667eea',
                    minWidth: '40px'
                  }}>
                    4.
                  </span>
                  <img 
                    src="images/trophies/bocw-map4.webp" 
                    alt="Map 4"
                    style={{ 
                      width: '120px', 
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '1.1em', color: '#2c3e50' }}>
                      Firebase Z
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                      I mean it's alright.
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  gap: '15px'
                }}>
                  <span style={{ 
                    fontSize: '1.5em', 
                    fontWeight: '700',
                    color: '#667eea',
                    minWidth: '40px'
                  }}>
                    5.
                  </span>
                  <img 
                    src="images/trophies/bocw-map5.webp" 
                    alt="Map 5"
                    style={{ 
                      width: '120px', 
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '1.1em', color: '#2c3e50' }}>
                      Forsaken
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '0.9em' }}>
                      I didn't even remember this map name, I had to look it up oml
                    </div>
                  </div>
                </div>
              </div>

              {/* Dead Ops Arcade Section */}
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
                borderRadius: '12px',
                borderLeft: '4px solid #dc3545'
              }}>
                <h5 style={{ 
                  fontSize: '1.2em', 
                  fontWeight: '700',
                  color: '#dc3545',
                  marginBottom: '10px',
                  marginTop: 0
                }}>
                  🕹️ Dead Ops Arcade 3
                </h5>
                <p style={{ 
                  fontSize: '1em', 
                  lineHeight: '1.6',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  First try.💪
                </p>
              </div>
            </div>
          )}

          {/* Multiplayer Tab */}
          {state.codBocwActiveTab === 'multiplayer' && (
            <div>
              {/* YouTube Video Embed */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
                background: '#000',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    borderRadius: '12px'
                  }}
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="Black Ops Cold War Multiplayer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '1.1em', 
                  lineHeight: '1.8',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  Description of the video or your multiplayer experience...
                </p>
              </div>
            </div>
          )}
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
            I was actually surprised with how much I liked the zombies mode in general. Although, it is still a big step down from old zombies imo. Campaign and multiplayer were decent.
          </p>
        </div>
      </div>
    </>
  )
});
