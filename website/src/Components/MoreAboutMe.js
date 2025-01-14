import React, { Component, forwardRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useSwipeable } from 'react-swipeable';
import './MoreAboutMe.css'; // Import the CSS file

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

class MoreAboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      slideWidth: window.innerWidth
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
    alert(`You clicked on ${geo.properties.name}`);
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

  render() {
    const { data = [], handlers } = this.props; // Provide a default value for data
    const { currentIndex, slideWidth } = this.state;

    if (data.length === 0) {
      return <div>No data available</div>;
    }

    const translateX = -currentIndex * slideWidth;

    return (
      <section id="more-about-me" {...handlers}> {/* Ensure the ID matches */}
        <div className="slider">
          <button className="arrow left-arrow" onClick={this.goToPreviousSlide}>
            &#10094;
          </button>
          <div className="slides-container" style={{ transform: `translateX(${translateX}px)` }}>
            <div className="slide" style={{ width: `${slideWidth}px` }}>
              <h2>World Map</h2>
              <ComposableMap projection="geoMercator">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => this.handleCountryClick(geo)}
                        style={{
                          default: { fill: this.getCountryColor(geo), outline: "none" },
                          hover: { fill: "#F53", outline: "none" },
                          pressed: { fill: "#E42", outline: "none" }
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
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