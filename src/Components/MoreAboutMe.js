import React, { Component, forwardRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Travel from './Travel';
import MyChess from './MyChess';
import Philosophy from './Philosophy';
import './MoreAboutMe.css';

class MoreAboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      slideWidth: window.innerWidth,
      // If needed, you can pass additional data or callbacks to your child components here.
    };
  }

  updateSlideWidth = () => {
    const slider = document.querySelector('.slider');
    const slideWidth = slider ? slider.clientWidth : window.innerWidth;
    this.setState({ slideWidth });
  };

  handleResize = () => {
    setTimeout(() => {
      this.updateSlideWidth();
    }, 100);
  };

  goToPreviousSlide = () => {
    // Track navigation
    if (window.gtag) {
      window.gtag('event', 'navigation_click', {
        event_category: 'User Interaction',
        event_label: 'Previous Slide',
        slide_direction: 'previous'
      });
    }

    this.setState((prevState) => {
      const lastIndex = 2; // Three slides: index 0, 1, and 2.
      const newIndex = prevState.currentIndex === 0 ? lastIndex : prevState.currentIndex - 1;
      return { currentIndex: newIndex };
    }, this.handleResize);
  };

  goToNextSlide = () => {
    // Track navigation
    if (window.gtag) {
      window.gtag('event', 'navigation_click', {
        event_category: 'User Interaction',
        event_label: 'Next Slide',
        slide_direction: 'next'
      });
    }

    this.setState((prevState) => {
      const lastIndex = 2;
      const newIndex = prevState.currentIndex === lastIndex ? 0 : prevState.currentIndex + 1;
      return { currentIndex: newIndex };
    }, this.handleResize);
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.updateSlideWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { currentIndex, slideWidth } = this.state;
    const offset = -currentIndex * slideWidth;

    return (
      <section id="more-about-me">
        <h1 className="section-title">More About Me</h1>
        <div className="slider">
          <button className="arrow left-arrow" onClick={this.goToPreviousSlide}>
            &#10094;
          </button>
          <div
            className="slides-container"
            style={{ marginLeft: `${offset}px` }}
          >
            {/* Passing slideWidth and any other props needed by each slide */}
            <Travel slideWidth={slideWidth} />
            <MyChess
              slideWidth={slideWidth}
              dialogue="Play my Chess Bot!!"
              chessGame={this.props.chessGame}  /* Pass your chessGame instance or state */
              onPieceDrop={this.props.onPieceDrop} /* Pass the onPieceDrop handler */
            />
            <Philosophy
              slideWidth={slideWidth}
              philosophyMessage="What is the meaning of life?"
            />
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
    onSwipedLeft: (eventData) => {
      // Track swipe gesture
      if (window.gtag) {
        window.gtag('event', 'swipe_gesture', {
          event_category: 'User Interaction',
          event_label: 'Swipe Left',
          swipe_direction: 'left'
        });
      }

      // Ignore swipe if child component requires interaction.
      if (eventData.event.target.closest('.chessboard-container')) return;
      if (ref && ref.current && ref.current.state.disableSwipe) return;
      props.goToNextSlide && props.goToNextSlide();
    },
    onSwipedRight: (eventData) => {
      // Track swipe gesture
      if (window.gtag) {
        window.gtag('event', 'swipe_gesture', {
          event_category: 'User Interaction',
          event_label: 'Swipe Right',
          swipe_direction: 'right'
        });
      }

      if (eventData.event.target.closest('.chessboard-container')) return;
      if (ref && ref.current && ref.current.state.disableSwipe) return;
      props.goToPreviousSlide && props.goToPreviousSlide();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
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
