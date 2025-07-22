// Logging utility for backend API calls
const API_BASE_URL = 'https://flame-picks-production-api.onrender.com';

// Function to send log entries to backend without blocking UI
export const logEvent = async (title, description) => {
  try {
    // Prevent logging if running on localhost
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return;
    }
    // Send log entry asynchronously without blocking the UI
    fetch(`${API_BASE_URL}/data/logentry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        website: 'ryancampisi.com',
        title: title,
        description: description
      })
    }).catch(error => {
      // Silently catch errors to prevent blocking user experience
      console.warn('Logging failed:', error);
    });
  } catch (error) {
    // Silently catch errors to prevent blocking user experience
    console.warn('Logging failed:', error);
  }
};
