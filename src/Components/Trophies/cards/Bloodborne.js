import React from 'react';

export const BloodborneCard = () => ({
  id: 'bloodborne',
  platinumNumber: 12,
  gameTitle: 'Bloodborne',
  platinumName: 'Yharnam, Pthumerian Queen',
  difficulty: 8,
  enjoyment: 9,
  completedDate: new Date('2020-06-15'),
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
});
