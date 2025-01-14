import React, { Component } from 'react';
import './MoreAboutMe.css'; // Import the CSS file

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
    setTimeout(this.updateSlideWidth, 300); // Delay the call to updateSlideWidth by 25 milliseconds
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

  render() {
    const { data = [] } = this.props; // Provide a default value for data
    const { currentIndex, slideWidth } = this.state;

    if (data.length === 0) {
      return <div>No data available</div>;
    }

    const translateX = -currentIndex * slideWidth;

    return (
      <section id="more-about-me"> {/* Ensure the ID matches */}
        <div className="slider">
          <button className="arrow left-arrow" onClick={this.goToPreviousSlide}>
            &#10094;
          </button>
          <div className="slides-container" style={{ transform: `translateX(${translateX}px)` }}>
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

export default MoreAboutMe;