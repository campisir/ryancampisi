import React from 'react';

export const SplitFictionCard = () => ({
  id: 'split-fiction',
  platinumNumber: 92,
  gameTitle: 'Split Fiction',
  platinumName: 'It Took Two',
  difficulty: 3,
  enjoyment: 8,
  completedDate: new Date('2026-02-07'),
  backgroundImage: '/images/trophies/split-fiction-bg.avif',
  content: (
    <>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 className="game-title" style={{ marginBottom: '10px' }}>
          Split Fiction
        </h3>
        <a
          href="https://psnprofiles.com/guide/21784-split-fiction-trophy-guide"
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
            "It Took Two"
          </p>
        </a>
        <img
          src="/images/trophies/split-fiction-platinum.png"
          alt="It Took Two Platinum Trophy"
          style={{
            width: '120px',
            height: '120px',
            marginBottom: '15px',
            objectFit: 'cover',
            borderRadius: '10px',
            filter: 'drop-shadow(0 4px 12px rgba(255, 215, 0, 0.6))'
          }}
          onError={(e) => {
            e.currentTarget.src = '/images/trophies/split-fiction-bg.avif';
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
          <span>📅 Started: March 9, 2025</span>
          <span>✅ Completed: February 7, 2026</span>
          <span>⏱️ 14 hours</span>
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
            <span>8/10</span>
          </div>
        </div>
      </div>

      <div className="custom-content">
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '12px',
          borderLeft: '4px solid #667eea'
        }}>
          <p style={{
            fontSize: '1.05em',
            lineHeight: '1.75',
            color: '#2c3e50',
            margin: 0,
            textAlign: 'center'
          }}>
            A quick and fun platinum with a smooth trophy list. Great pacing, low stress cleanup, and an enjoyable co-op focused run from start to finish.
          </p>
        </div>
      </div>
    </>
  )
});