import React from 'react';

export const LiSDoubleExposureCard = (state, setState) => ({
  id: 'lis-double-exposure',
  platinumNumber: 89,
  gameTitle: 'Life is Strange: Double Exposure',
  platinumName: 'Picture Perfect',
  difficulty: 0,
  enjoyment: 5,
  completedDate: new Date('2025-10-09'),
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
                  if (!state.lisDeClickedCharacters.includes(character.id)) {
                    setState({
                      lisDeClickedCharacters: [...state.lisDeClickedCharacters, character.id]
                    });
                  }
                }}
                style={{
                  position: 'relative',
                  cursor: state.lisDeClickedCharacters.includes(character.id) ? 'default' : 'pointer',
                  transition: 'transform 0.2s ease',
                  transform: state.lisDeClickedCharacters.includes(character.id) ? 'none' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!state.lisDeClickedCharacters.includes(character.id)) {
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
                {state.lisDeClickedCharacters.includes(character.id) && (
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

          {state.lisDeClickedCharacters.length > 0 && (() => {
            const characterMessages = {
              1: "You can romance Amanda.",
              2: "She's into Max...",
              3: "She's as lesbian as it gets.",
              4: "Moses has a boyfriend in the game.",
              5: "This guy was talking about how he finds Moses hot.",
              6: "Trans + Lesbian.",
              7: "Super gay."
            };
            
            const lastClicked = state.lisDeClickedCharacters[state.lisDeClickedCharacters.length - 1];
            const isAllClicked = state.lisDeClickedCharacters.length === 7;
            
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
});
