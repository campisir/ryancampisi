import React from 'react';

export const FF7RemakeCard = () => ({
  id: 'ff7',
  platinumNumber: 88,
  gameTitle: 'Final Fantasy VII Remake',
  platinumName: 'Master of Fate',
  difficulty: 6,
  enjoyment: 7,
  completedDate: new Date('2025-09-13'),
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
});
