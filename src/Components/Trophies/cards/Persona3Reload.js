import React from 'react';

export const Persona3ReloadCard = (state, setState) => ({
  id: 'persona-3-reload',
  platinumNumber: 86,
  gameTitle: 'Persona 3 Reload',
  platinumName: 'A Most Remarkable Guest',
  difficulty: 3,
  enjoyment: 9,
  completedDate: new Date('2024-06-09'),
  backgroundImage: '/images/trophies/persona3reload-bg.jpg',
  content: (
    <>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 className="game-title" style={{ marginBottom: '10px' }}>
          Persona 3 Reload
        </h3>
        <a 
          href="https://psnprofiles.com/guide/18798-persona-3-reload-trophy-guide" 
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
            "A Most Remarkable Guest"
          </p>
        </a>
        <img 
          src="/images/trophies/persona3reload-platinum.png" 
          alt="A Most Remarkable Guest Platinum Trophy"
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
          <span>📅 Started: February 3, 2024</span>
          <span>✅ Completed: June 9, 2024</span>
          <span>⏱️ 119 hours</span>
        </div>
        
        {/* Custom Rating Format - Different from other cards */}
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
            <span>3/10</span>
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
            <span>9/10</span>
          </div>
        </div>
      </div>

      <div className="custom-content">
        {/* Social Links Ranking */}
        <div style={{ 
          marginBottom: '40px',
          padding: '25px',
          background: 'linear-gradient(135deg, rgba(31, 58, 147, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
          borderRadius: '15px',
          border: '2px solid rgba(31, 58, 147, 0.3)'
        }}>
          <h4 style={{ 
            fontSize: '1.6em', 
            marginBottom: '25px', 
            textAlign: 'center',
            color: '#1f3a93',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Social Links Ranking
          </h4>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '20px',
            justifyItems: 'center'
          }}>
            {[
              { rank: 1, name: 'Akinari', image: '/images/trophies/persona3-sl-akinari.png', comment: 'The legend himself' },
              { rank: 2, name: 'Tanaka', image: '/images/trophies/persona3-sl-tanaka.png', comment: 'I mean... it\'s Tanaka' },
              { rank: 3, name: 'Hidetoshi', image: '/images/trophies/persona3-sl-hidetoshi.png', comment: 'Insane aura' },
              { rank: 4, name: 'Mutatsu', image: '/images/trophies/persona3-sl-mutatsu.png', comment: 'Unc has some wisdom fr' },
              { rank: 5, name: 'Aigis', image: '/images/trophies/persona3-sl-aigis.png', comment: 'My favorite SEES member but you get like two weeks' },
              { rank: 6, name: 'Kenji', image: '/images/trophies/persona3-sl-kenji.png', comment: 'The homie' },
              { rank: 7, name: 'Maya', image: '/images/trophies/persona3-sl-maya.png', comment: 'So unique' },
              { rank: 8, name: 'Yuko', image: '/images/trophies/persona3-sl-yuko.png', comment: 'I lowkey fw her' },
              { rank: 9, name: 'Mitsuru', image: '/images/trophies/persona3-sl-mitsuru.png', comment: 'Becomes available sooo late but she\'s dope' },
              { rank: 10, name: 'Yukari', image: '/images/trophies/persona3-sl-yukari.png', comment: 'I\'ve always been neutral to Yukari' },        
              { rank: 11, name: 'Nozomi', image: '/images/trophies/persona3-sl-nozomi.png', comment: 'Bro is always available lol' },
              { rank: 12, name: 'Fuuka', image: '/images/trophies/persona3-sl-fuuka.png', comment: 'Persona loves the bad cook substories' },
              { rank: 13, name: 'Kazushi', image: '/images/trophies/persona3-sl-kazushi.png', comment: 'The knee guy' },             
              { rank: 14, name: 'Bunkichi & Mitsuko', image: '/images/trophies/persona3-sl-couple.png', comment: 'They cool I guess' },
              { rank: 15, name: 'Bebe', image: '/images/trophies/persona3-sl-bebe.png', comment: 'He cool but weird ngl' },
              { rank: 16, name: 'Keisuke', image: '/images/trophies/persona3-sl-keisuke.png', comment: 'School link + forgettable' },
              { rank: 17, name: 'Maiko', image: '/images/trophies/persona3-sl-maiko.png', comment: 'No I don\'t wanna play' },
              { rank: 18, name: 'Mamoru', image: '/images/trophies/persona3-sl-mamoru.png', comment: 'I always forget this guy' },
              { rank: 19, name: 'Chihiro', image: '/images/trophies/persona3-sl-chihiro.png', comment: 'School link + annoying' },
              { rank: 20, name: 'Pharos', image: '/images/trophies/persona3-sl-pharos.png', comment: 'Annoying AF' },
            
            ].map((character) => (
              <div key={character.rank} style={{
                textAlign: 'center',
                transition: 'transform 0.2s ease',
                cursor: 'default',
                maxWidth: '150px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  margin: '0 auto 10px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: character.rank <= 3 
                    ? `3px solid ${character.rank === 1 ? '#ffd700' : character.rank === 2 ? '#c0c0c0' : '#cd7f32'}`
                    : '3px solid rgba(31, 58, 147, 0.3)',
                  boxShadow: character.rank <= 3 
                    ? '0 4px 15px rgba(0,0,0,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  <img 
                    src={character.image}
                    alt={character.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = '/images/portfolio/placeholder.jpg';
                    }}
                  />
                  
                </div>
                <div style={{
                  fontSize: '0.95em',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '5px'
                }}>
                  #{character.rank}. {character.name}
                </div>
                <div style={{
                  fontSize: '0.8em',
                  color: '#777',
                  fontStyle: 'italic',
                  lineHeight: '1.3'
                }}>
                  {character.comment}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story and Highlights - Commented out for now */}
        {/* <div style={{ marginBottom: '30px' }}>
          <h4 style={{ 
            fontSize: '1.5em', 
            marginBottom: '20px', 
            textAlign: 'center',
            color: '#2c3e50'
          }}>
            Experience Highlights
          </h4>
          
          <div style={{ 
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 235, 59, 0.05) 100%)',
              borderRadius: '12px',
              border: '2px solid rgba(255, 193, 7, 0.3)'
            }}>
              <h5 style={{ 
                fontSize: '1.2em', 
                marginBottom: '10px',
                color: '#f57c00'
              }}>
                🎭 The Story
              </h5>
              <p style={{ fontSize: '0.95em', color: '#555', lineHeight: '1.6' }}>
                One of the most emotionally powerful narratives in gaming. The themes of mortality, friendship, and accepting death hit incredibly hard.
              </p>
            </div>

            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(186, 104, 200, 0.05) 100%)',
              borderRadius: '12px',
              border: '2px solid rgba(156, 39, 176, 0.3)'
            }}>
              <h5 style={{ 
                fontSize: '1.2em', 
                marginBottom: '10px',
                color: '#7b1fa2'
              }}>
                🎵 The Soundtrack
              </h5>
              <p style={{ fontSize: '0.95em', color: '#555', lineHeight: '1.6' }}>
                Absolute masterpiece. "Mass Destruction" and "Burn My Dread" are iconic, but the entire OST perfectly captures the game's atmosphere.
              </p>
            </div>

            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.05) 100%)',
              borderRadius: '12px',
              border: '2px solid rgba(76, 175, 80, 0.3)'
            }}>
              <h5 style={{ 
                fontSize: '1.2em', 
                marginBottom: '10px',
                color: '#388e3c'
              }}>
                🎮 The Remake
              </h5>
              <p style={{ fontSize: '0.95em', color: '#555', lineHeight: '1.6' }}>
                The modern quality-of-life improvements and stunning visuals make this the definitive way to experience the story. Tartarus is no longer a slog!
              </p>
            </div>
          </div>
        </div> */}

        {/* My Go-To Party */}
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ 
            fontSize: '1.5em', 
            marginBottom: '20px', 
            textAlign: 'center',
            color: '#2c3e50'
          }}>
            ⚔️ My Go-To Party
          </h4>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {[
              { name: 'Makoto', image: '/images/trophies/persona3-party-makoto.avif', role: 'Controversial pick' },
              { name: 'Aigis', image: '/images/trophies/persona3-party-aigis.webp', role: 'Physical damage' },
              { name: 'Akihiko', image: '/images/trophies/persona3-party-akihiko.avif', role: 'Buff/Debuff GOAT' },
              { name: 'Ken', image: '/images/trophies/persona3-party-ken.webp', role: 'Medic... sort of' }
            ].map((member) => (
              <div key={member.name} style={{
                width: '140px',
                textAlign: 'center',
                transition: 'transform 0.2s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  position: 'relative',
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 12px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '3px solid rgba(211, 47, 47, 0.4)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)'
                }}>
                  <img 
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = '/images/portfolio/placeholder.jpg';
                    }}
                  />
                </div>
                <div style={{
                  fontSize: '1.1em',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '5px'
                }}>
                {member.name}
                </div>
                <div style={{
                  fontSize: '0.85em',
                  color: '#777',
                  fontStyle: 'italic'
                }}>
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Thoughts */}
        <div style={{
          padding: '25px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '15px',
          border: '2px solid rgba(102, 126, 234, 0.3)',
          textAlign: 'center'
        }}>
          <h4 style={{ 
            fontSize: '1.5em', 
            marginBottom: '15px',
            color: '#667eea'
          }}>
            Final Verdict
          </h4>
          <p style={{ 
            fontSize: '1.1em', 
            lineHeight: '1.8',
            color: '#2c3e50',
            fontWeight: '500'
          }}>
            Persona 3 Reload is a masterclass in storytelling and character development. The journey through this game is emotionally exhausting in the best way possible. It's a reminder that some stories stay with you forever. <strong>Memento Mori.</strong>
          </p>
          <p style={{ 
            fontSize: '0.95em', 
            marginTop: '15px',
            color: '#777',
            fontStyle: 'italic'
          }}>
            "The moment man devoured the fruit of knowledge, he sealed his fate... Entrusting his future to the cards, man clings to a dim hope. Yet, the Arcana is the means by which all is revealed..."
          </p>
        </div>
      </div>
    </>
  )
});
