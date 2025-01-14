import React, { Component, forwardRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useSwipeable } from 'react-swipeable';
import './MoreAboutMe.css'; // Import the CSS file

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Data structure to hold country details
const countryDetails = {
  "United States of America": {
    name: "United States of America",
    description: "I was born here.",
    dateVisited: "Date first visited: December 3, 2001",
    photo: "path/to/usa_photo.jpg",
    caption: "Guys, I swear it counts!"
  },
  "Israel": {
    name: "Israel",
    description: "This is the first country I visited internationally. They really like olives here.",
    dateVisited: "Date first visited: July X, 2019",
    photo: "path/to/israel_photo.jpg",
    caption: "Me, in 11th grade, rolling down a slope in Nazereth using Heelys."
  },
  "Japan": {
    name: "Japan",
    description: "I studied abroad here during the Summer 2023 semester. Don't ask me to speak Japanese, though.",
    dateVisited: "Date first visited: May 31, 2023",
    photo: "path/to/japan_photo.jpg",
    caption: "A funny souvenir image I got from a candy cafe in Kyoto."
  },
  "Italy": {
    name: "Italy",
    description: "I visited here as part of a cruise I took in 2024. Surprisingly, this trip was unrelated from my Italian heritage (you may have thought from my last name).",
    dateVisited: "Date first visited: June X, 2024",
    photo: "path/to/italy_photo.jpg",
    caption: "By pure coincidence, I got to see the Tour De France come through Bologna the day I was staying there."
  },
  "Greece": {
    name: "Greece",
    description: "I visited here as part of a cruise I took in 2024.",
    dateVisited: "Date first visited: June X, 2024",
    photo: "path/to/greece_photo.jpg",
    caption: "I walked up all of the stairs in Santorini. Where's my medal?"
  },
  "Montenegro": {
    name: "Montenegro",
    description: "I visited here as part of a cruise I took in 2024.",
    dateVisited: "Date first visited: June X, 2024",
    photo: "path/to/montenegro_photo.jpg",
    caption: "A boat ride in Montenegro."
  },
  "Norway": {
    name: "Norway",
    description: "This was the second country I visited.",
    dateVisited: "Date first visited: December X, 2022",
    photo: "path/to/norway_photo.jpg",
    caption: "Me with a goat at the top of a mountain in Burgen."
  }
  // Add more countries and their details here
};

class MoreAboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      slideWidth: window.innerWidth,
      isBlurred: true,
      showPopup: false,
      selectedCountry: null
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(this.updateSlideWidth, 300); // Delay the call to updateSlideWidth by 300 milliseconds
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    setTimeout(this.updateSlideWidth, 100); // Delay the call to updateSlideWidth by 100 milliseconds
  };

  updateSlideWidth = () => {
    console.log("Updating slide width");
    const slider = document.querySelector('.slider');
    const slideWidth = slider ? slider.clientWidth : window.innerWidth;
    this.setState({ slideWidth }, () => {
      // Ensure the slides are centered after setting the slide width
      this.forceUpdate();
    });
  };

  goToPreviousSlide = () => {
    const { currentIndex } = this.state;
    const { data } = this.props;
    const lastIndex = data.length - 1;
    const shouldResetIndex = currentIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentIndex - 1;

    this.setState({
      currentIndex: index
    });
    this.handleResize();
  };

  goToNextSlide = () => {
    const { currentIndex } = this.state;
    const { data } = this.props;
    const lastIndex = data.length - 1;
    const shouldResetIndex = currentIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentIndex + 1;

    this.setState({
      currentIndex: index
    });
    this.handleResize();
  };

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

  getCountryColor = (geo) => {
    const countryName = geo.properties.name;
    // Define custom colors for specific countries
    const countryColors = {
      "United States of America": "#90EE90", // Light green
      "Israel": "#90EE90", // Light green
      "Japan": "#90EE90", // Light green
      "Italy": "#90EE90", // Light green
      "Greece": "#90EE90", // Light green
      "Montenegro": "#90EE90", // Light green
      "Norway": "#90EE90", // Light green
      // Add more countries and their colors here
    };
    return countryColors[countryName] || "#D6D6DA"; // Default color
  };

  removeBlur = () => {
    this.setState({ isBlurred: false });
  };

  render() {
    const { data = [], handlers } = this.props; // Provide a default value for data
    const { currentIndex, slideWidth, isBlurred, showPopup, selectedCountry } = this.state;

    if (data.length === 0) {
      return <div>No data available</div>;
    }

    const translateX = -currentIndex * slideWidth;

    // List of clickable countries
    const clickableCountries = [
      "United States of America",
      "Israel",
      "Japan",
      "Italy",
      "Greece",
      "Montenegro",
      "Norway"
      // Add more countries here
    ];

    return (
      <section id="more-about-me" {...handlers}> {/* Ensure the ID matches */}
        <h1 className="section-title">More About Me</h1>
        <div className="slider">
          <button className="arrow left-arrow" onClick={this.goToPreviousSlide}>
            &#10094;
          </button>
          <div className="slides-container" style={{ transform: `translateX(${translateX}px)` }}>
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
                <ComposableMap projection="geoMercator">
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map(geo => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={clickableCountries.includes(geo.properties.name) ? () => this.handleCountryClick(geo) : null}
                          style={{
                            default: { fill: this.getCountryColor(geo), outline: "none" },
                            hover: { fill: clickableCountries.includes(geo.properties.name) ? "#F53" : this.getCountryColor(geo), outline: "none" },
                            pressed: { fill: clickableCountries.includes(geo.properties.name) ? "#E42" : this.getCountryColor(geo), outline: "none" }
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ComposableMap>
              </div>
            </div>
            {data.map((item, index) => (
              <div className="slide" key={index} style={{ width: `${slideWidth}px` }}>
                <h2>{item.title}</h2>
                <img src={item.image} alt={item.title} />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <button className="arrow right-arrow" onClick={this.goToNextSlide}>
            &#10095;
          </button>
        </div>
        {showPopup && selectedCountry && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={this.closePopup}>&times;</span>
              <h2>{selectedCountry.name}</h2>
              <p>{selectedCountry.description}</p>
              <p>{selectedCountry.dateVisited}</p>
              <img src={selectedCountry.photo} alt={selectedCountry.name} />
              <p className="caption">{selectedCountry.caption}</p>
            </div>
          </div>
        )}
      </section>
    );
  }
}

const MoreAboutMeWithSwipe = forwardRef((props, ref) => {
  const handlers = useSwipeable({
    onSwipedLeft: props.goToNextSlide,
    onSwipedRight: props.goToPreviousSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return <MoreAboutMe {...props} handlers={handlers} ref={ref} />;
});

const MoreAboutMeContainer = (props) => {
  const moreAboutMeRef = React.createRef();

  const goToPreviousSlide = () => {
    if (moreAboutMeRef.current) {
      moreAboutMeRef.current.goToPreviousSlide();
    }
  };

  const goToNextSlide = () => {
    if (moreAboutMeRef.current) {
      moreAboutMeRef.current.goToNextSlide();
    }
  };

  return (
    <MoreAboutMeWithSwipe
      {...props}
      goToPreviousSlide={goToPreviousSlide}
      goToNextSlide={goToNextSlide}
      ref={moreAboutMeRef}
    />
  );
};

export default MoreAboutMeContainer;