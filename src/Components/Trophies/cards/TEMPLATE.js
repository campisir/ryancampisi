import React from 'react';

/**
 * Template for creating a new trophy card
 * 
 * INSTRUCTIONS:
 * 1. Copy this file and rename it to YourGameName.js (e.g., Elden Ring.js)
 * 2. Replace all the placeholder text with your game's information
 * 3. Add your images to the public/images/trophies/ folder
 * 4. Import and add this card to Trophies/index.js
 * 5. If your card needs state (like tabs or interactive elements), add state and setState parameters
 * 
 * SIMPLE EXAMPLE (no state needed):
 * export const YourGameCard = () => ({
 *   id: 'your-game-id',
 *   platinumNumber: 87,
 *   backgroundImage: 'images/trophies/your-game-bg.jpg',
 *   content: (...)
 * });
 * 
 * COMPLEX EXAMPLE (with state for interactive elements):
 * export const YourGameCard = (state, setState) => ({
 *   id: 'your-game-id',
 *   platinumNumber: 87,
 *   backgroundImage: 'images/trophies/your-game-bg.jpg',
 *   content: (...)
 * });
 */

export const TemplateCard = (state, setState) => ({
  id: 'template-game', // REQUIRED: Unique ID for this trophy (use lowercase with dashes)
  platinumNumber: 0, // REQUIRED: Your platinum trophy number (90, 89, 88, etc.)
  gameTitle: 'Your Game Title', // REQUIRED: Full game title (for search)
  platinumName: 'Your Platinum Trophy Name', // REQUIRED: Trophy name (for search)
  difficulty: 5, // REQUIRED: Difficulty rating 0-10 (for sorting)
  enjoyment: 5, // REQUIRED: Enjoyment rating 0-10 (for sorting)
  completedDate: new Date('2025-01-01'), // REQUIRED: Completion date (for sorting)
  backgroundImage: 'images/trophies/template-bg.jpg', // REQUIRED: Path to background image
  
  content: (
    <>
      {/* Header Section - Game Title and Platinum Name */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 className="game-title" style={{ marginBottom: '10px' }}>
          Your Game Title Here
        </h3>
        
        {/* Optional: Link to trophy guide */}
        <a 
          href="https://psnprofiles.com/guide/XXXXX-your-game-trophy-guide" 
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
            "Your Platinum Trophy Name"
          </p>
        </a>
        
        {/* Optional: Platinum Trophy Icon */}
        <img 
          src="images/trophies/template-platinum.png" 
          alt="Your Platinum Trophy"
          style={{ 
            width: '120px', 
            height: '120px',
            marginBottom: '15px',
            filter: 'drop-shadow(0 4px 12px rgba(255, 215, 0, 0.6))'
          }}
        />
        
        {/* Trophy Stats - Start Date, Completion Date, Hours */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px',
          flexWrap: 'wrap',
          marginBottom: '15px',
          fontSize: '0.95em'
        }}>
          <span>📅 Started: Month Day, Year</span>
          <span>✅ Completed: Month Day, Year</span>
          <span>⏱️ XX hours</span>
        </div>
        
        {/* Difficulty and Enjoyment Ratings */}
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

      {/* Custom Content Section - This is where you get creative! */}
      <div className="custom-content">
        
        {/* OPTION 1: Simple Text Review */}
        <div style={{
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
            Your personal review and thoughts about the game go here. 
            This is completely customizable!
          </p>
        </div>

        {/* OPTION 2: Character Rankings (Like FF7 Remake) */}
        {/* Uncomment and customize if you want character rankings
        <h4 style={{ marginBottom: '15px', fontSize: '1.2em', textAlign: 'center' }}>
          My Top 5 Characters
        </h4>
        <div className="character-ranking">
          <div className="rank-item">
            <span className="rank-number">1.</span>
            <span className="character-name">Character Name</span>
          </div>
          <div className="rank-item">
            <span className="rank-number">2.</span>
            <span className="character-name">Character Name</span>
          </div>
        </div>
        */}

        {/* OPTION 3: Stats Grid (Like Bloodborne) */}
        {/* Uncomment and customize if you want a stats grid
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
        </div>
        */}

        {/* OPTION 4: Image Gallery */}
        {/* Uncomment and customize if you want to add images
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '20px'
        }}>
          <div className="character-card">
            <img 
              src="images/trophies/your-image1.jpg" 
              alt="Description"
              style={{ 
                width: '100%', 
                height: '180px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            />
            <div style={{ 
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '1.1em',
              color: '#667eea',
              marginTop: '10px'
            }}>
              Image Caption
            </div>
          </div>
        </div>
        */}

        {/* OPTION 5: Tabbed Content (Like FF7 Rebirth) */}
        {/* 
        If you want tabs, you need to:
        1. Add state to your component (state, setState parameters)
        2. Add a state property like: yourGameActiveTab: 'tab1'
        3. Use buttons with onClick to change tabs
        4. Show/hide content based on state.yourGameActiveTab value
        
        See FF7Rebirth.js for a complete example!
        */}
      </div>
    </>
  )
});

// Don't forget to add this export to Trophies/index.js!
