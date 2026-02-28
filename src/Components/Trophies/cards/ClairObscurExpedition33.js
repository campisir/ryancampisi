import React from 'react';

export const ClairObscurExpedition33Card = () => ({
  id: 'clair-obscur-expedition-33',
  platinumNumber: 91,
  gameTitle: 'Clair Obscur: Expedition 33',
  platinumName: 'The Greatest Expedition in History',
  difficulty: 4,
  enjoyment: 8,
  completedDate: new Date('2026-01-10'),
  backgroundImage: '/images/trophies/clair-obscur-expedition-33-bg.png',

  content: (
    <>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 className="game-title" style={{ marginBottom: '10px' }}>
          Clair Obscur: Expedition 33
        </h3>

        <a
          href="https://psnprofiles.com/guide/22179-clair-obscur-expedition-33-trophy-guide"
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
            "The Greatest Expedition in History"
          </p>
        </a>

        <img
          src="/images/trophies/clair-obscur-expedition-33-platinum.png"
          alt="The Greatest Expedition in History Platinum Trophy"
          style={{
            width: '120px',
            height: '120px',
            marginBottom: '15px',
            objectFit: 'cover',
            borderRadius: '10px',
            filter: 'drop-shadow(0 4px 12px rgba(255, 215, 0, 0.6))'
          }}
          onError={(e) => {
            e.currentTarget.src = '/images/trophies/clair-obscur-expedition-33-bg.png';
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
          <span>📅 Started: December 2, 2025</span>
          <span>✅ Completed: January 10, 2026</span>
          <span>⏱️ 67 hours</span>
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
            <span>4/10</span>
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
          marginBottom: '30px',
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.08) 100%)',
          borderRadius: '12px',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{
            fontSize: '1.4em',
            marginBottom: '15px',
            textAlign: 'center',
            color: '#2c3e50'
          }}>
            ⚔️ My Go-To Party
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '18px'
          }}>
            {[
              {
                name: 'Verso',
                image: '/images/trophies/clair-obscur-party-verso.webp',
                explanation: 'High damage.'
              },
              {
                name: 'Sciel',
                image: '/images/trophies/clair-obscur-party-sciel.webp',
                explanation: 'Passes turns, buffs, cleanses, and doubles damage.'
              },
              {
                name: 'Monoco',
                image: '/images/trophies/clair-obscur-party-monoco.png',
                explanation: 'High damage. My go-to level 3 gradient attack to instantly break enemy.'
              }
            ].map((member) => (
              <div
                key={member.name}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'white',
                  border: '1px solid rgba(102, 126, 234, 0.25)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '170px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '10px'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/images/trophies/clair-obscur-expedition-33-bg.png';
                  }}
                />
                <div style={{
                  fontSize: '1.1em',
                  fontWeight: '700',
                  color: '#667eea',
                  textAlign: 'center',
                  marginBottom: '8px'
                }}>
                  {member.name}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.92em',
                  lineHeight: '1.55',
                  color: '#495057',
                  textAlign: 'center'
                }}>
                  {member.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
});