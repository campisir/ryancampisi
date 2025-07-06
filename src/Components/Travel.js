import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import './Travel.css';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

const countryDetails = {
  "United States of America": {
    name: "United States of America",
    description: "I was born here.",
    dateVisited: "December 3, 2001",
    photo: "images/usa_photo.png",
    caption: "My hometown of St. Petersburg, Florida."
  },
  "Israel": {
    name: "Israel",
    description: "This is the first country I visited internationally. I recall there being a lot of olives.",
    dateVisited: "July 21, 2019",
    photo: "images/israel_photo.png",
    caption: "The best independent chicken establishment in Nazareth."
  },
  "Japan": {
    name: "Japan",
    description: "I studied abroad here during the Summer 2023 semester. Don't ask me to speak Japanese, though.",
    dateVisited: "May 31, 2023",
    photo: "images/japan_photo.jpg",
    caption: "A funny souvenir image I got from a maid cafe in Kyoto."
  },
  "Italy": {
    name: "Italy",
    description: "I visited here as part of a cruise I took in 2024. Surprisingly, this trip was unrelated from my Italian heritage.",
    dateVisited: "June 21, 2024",
    photo: "images/italy_photo.png",
    caption: "By pure coincidence, I got to see the Tour De France come through Bologna."
  },
  "Greece": {
    name: "Greece",
    description: "I visited here as part of a cruise I took in 2024.",
    dateVisited: "June 24, 2024",
    photo: "images/greece_photo.png",
    caption: "I walked up all of these stairs in Santorini."
  },
  "Montenegro": {
    name: "Montenegro",
    description: "I visited here as part of a cruise I took in 2024. It was raining.",
    dateVisited: "June 27 2024",
    photo: "images/montenegro_photo.jpg",
    caption: "A rainy day in Montenegro."
  },
  "Norway": {
    name: "Norway",
    description: "I went here with my brother for New Years 2023 and it was very cold.",
    dateVisited: "December 29, 2022",
    photo: "images/norway_photo.jpg",
    caption: "Me with a goat at the top of a mountain in Bergen."
  },
  "Croatia": {
    name: "Croatia",
    description: "I visited here as part of a cruise I took in 2024.",
    dateVisited: "June 28, 2024",
    photo: "images/croatia_photo.png",
    caption: "A submarine tour in Croatia."
  },
  "Bahamas": {
    name: "Bahamas",
    description: "I visited here as part of a cruise I took in 2025.",
    dateVisited: "June 16, 2025",
    photo: "images/bahamas_photo.png",
    caption: "A boat ride near rose island in the Bahamas."
  },
  "Dominican Rep.": {
    name: "Dominican Republic",
    description: "I visited here as part of a cruise I took in 2025.",
    dateVisited: "June 21, 2025",
    photo: "images/dominican_republic_photo.PNG",
    caption: "Some squirrel monkeys and I in the Dominican Republic."
  },
  "Puerto Rico": {
    name: "Puerto Rico",
    description: "I visited here as part of a cruise I took in 2025.",
    dateVisited: "June 20, 2025",
    photo: "images/puerto_rico_photo.jpg",
    caption: "My brothers and I at the San Juan National Historic Site (I'm on the right)."
  }
};

const clickableCountries = [
  "United States of America",
  "Israel",
  "Japan",
  "Italy",
  "Greece",
  "Montenegro",
  "Norway",
  "Croatia",
  "Bahamas",
  "Dominican Rep.",
  "Puerto Rico"
];

class Travel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isBlurred: true,
        mapPosition: { x: 0, y: 0 },
        mapScale: 1,
        showPopup: false,         // <-- new state flag for modal popup
        selectedCountry: null     // <-- new state variable to hold country details
    };
  }

  // Called in componentDidMount to mimic the old behavior of resizing the inner map
  updateMapSize = () => {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
      const width = mapContainer.clientWidth;
      const height = mapContainer.clientHeight;
      const mapInner = mapContainer.querySelector('.map-inner');
      if (mapInner) {
        mapInner.style.width = `${width * 2}px`;
        mapInner.style.height = `${height * 2}px`;
      }
    }
  };

  componentDidMount() {
    // Call updateMapSize after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.updateMapSize();
    }, 300);
  }

  removeBlur = () => {
    this.setState({ isBlurred: false });
  };

  handleMapDragStart = (e) => {
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.dragStartMapX = this.state.mapPosition.x;
    this.dragStartMapY = this.state.mapPosition.y;
  };

  handleMapDrag = (e) => {
    if (this.dragStartX !== undefined && this.dragStartY !== undefined) {
      const deltaX = e.clientX - this.dragStartX;
      const deltaY = e.clientY - this.dragStartY;
      this.setState((prevState) => {
        const newMapPosition = {
          x: prevState.mapPosition.x + deltaX,
          y: prevState.mapPosition.y + deltaY
        };
        return { mapPosition: this.applyBounds(newMapPosition, prevState.mapScale) };
      });
    }
  };

  handleMapDragEnd = () => {
    this.dragStartX = undefined;
    this.dragStartY = undefined;
  };

  handleMapWheel = (e) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
    this.setState((prevState) => {
      const newMapScale = Math.max(1, prevState.mapScale * scaleChange);
      return {
        mapScale: newMapScale,
        mapPosition: this.applyBounds(prevState.mapPosition, newMapScale)
      };
    });
  };

  applyBounds = (position, scale) => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return position;
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    const mapWidth = containerWidth * scale;
    const mapHeight = containerHeight * scale;
    const minX = containerWidth - mapWidth;
    const minY = containerHeight - mapHeight;
    return {
      x: Math.min(Math.max(position.x, minX), 0),
      y: Math.min(Math.max(position.y, minY), 0)
    };
  };

  // Replace the current handleCountryClick with the following:
handleCountryClick = (geo) => {
  const countryName = geo.properties.name;
  const details = countryDetails[countryName];
  if (details) {
    this.setState({ showPopup: true, selectedCountry: details });
  }
};

closePopup = () => {
  this.setState({ showPopup: false, selectedCountry: null });
};


  // Return a green color for clickable countries and the default gray otherwise
  getCountryColor = (geo) => {
    const countryName = geo.properties.name;
    
    // Debug: Log country names to help identify the correct name for Dominican Republic
    const countryColors = {
      "United States of America": "#90EE90",
      "Israel": "#90EE90",
      "Japan": "#90EE90",
      "Italy": "#90EE90",
      "Greece": "#90EE90",
      "Montenegro": "#90EE90",
      "Norway": "#90EE90",
      "Croatia": "#90EE90",
      "Bahamas": "#90EE90",
      "Dominican Rep.": "#90EE90",
      "Puerto Rico": "#90EE90"
    };
    return countryColors[countryName] || "#D6D6DA";
  };

  render() {
  const { slideWidth } = this.props;
  const { isBlurred, mapPosition, mapScale, showPopup, selectedCountry } = this.state;
  return (
    <div className="slide" style={{ width: `${slideWidth}px` }}>
      <h2>My Travels</h2>
      {isBlurred && (
        <div className="blur-overlay">
          <p className="blur-message">
            I love to travel. Currently, I have only traveled internationally a handful of times. My life goal is to visit at least fifty countries. Click to see my interactive travel map.
          </p>
          <button className="unblur-button" onClick={this.removeBlur}>See Map</button>
        </div>
      )}
      <div className={`map-container ${isBlurred ? 'blurred' : ''}`}>
        <div
          className="map-inner"
          style={{ transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})` }}
          onMouseDown={this.handleMapDragStart}
          onMouseMove={this.handleMapDrag}
          onMouseUp={this.handleMapDragEnd}
          onMouseLeave={this.handleMapDragEnd}
          onWheel={this.handleMapWheel}
        >
          <ComposableMap projection="geoMercator">
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={
                        clickableCountries.includes(geo.properties.name)
                          ? () => this.handleCountryClick(geo)
                          : null
                      }
                      style={{
                        default: {
                          fill: this.getCountryColor(geo),
                          outline: "none",
                          cursor: clickableCountries.includes(geo.properties.name)
                            ? "pointer"
                            : "default"
                        },
                        hover: {
                        fill: clickableCountries.includes(geo.properties.name)
                            ? "#F53"
                            : this.getCountryColor(geo),
                        outline: "none",
                        cursor: clickableCountries.includes(geo.properties.name) ? "pointer" : "default"
                        },
                        pressed: {
                          fill: clickableCountries.includes(geo.properties.name)
                            ? "#E42"
                            : this.getCountryColor(geo),
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
      {showPopup && selectedCountry && (
        <div className="modal-overlay" onClick={this.closePopup}>
            <div className="popup" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={this.closePopup}>&times;</span>
            <div className="popup-content">
                <h2>{selectedCountry.name}</h2>
                <p>{selectedCountry.description}</p>
                <p><strong>Date first visited:</strong> {selectedCountry.dateVisited}</p>
                <img src={selectedCountry.photo} alt={selectedCountry.name} />
                <p className="caption">{selectedCountry.caption}</p>
            </div>
            </div>
        </div>
        )}
    </div>
  );
}
}

export default Travel;