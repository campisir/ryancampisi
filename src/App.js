import React, { Component } from 'react';
//import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';
import MoreAboutMe from './Components/MoreAboutMe'; // Import the new component
import { logEvent } from './utils/logging';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    //ReactGA.initialize('UA-110570651-1');
    //ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    window.gtag('config', 'G-HN847L26DC', {
      page_path: window.location.pathname,
    });
    this.getResumeData();
    
    // Log site load
    logEvent('Site Load', 'User visited ryancampisi.com');
    
    // Set up Intersection Observer for section tracking
    this.setupSectionTracking();
  }

  setupSectionTracking = () => {
    const sections = ['about', 'resume', 'portfolio', 'more-about-me', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && window.gtag) {
          window.gtag('event', 'section_view', {
            event_category: 'Page View',
            event_label: `Section Viewed: ${entry.target.id}`,
            section_name: entry.target.id
          });
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the section is visible
    });

    // Observe all sections after a short delay to ensure DOM is ready
    setTimeout(() => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    }, 1000);
  };

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <section id="about">
          <About data={this.state.resumeData.main}/>
        </section>
        <section id="resume">
          <Resume data={this.state.resumeData.resume}/>
        </section>
        { <section id="portfolio">
          <Portfolio data={this.state.resumeData.portfolio}/>
        </section> }
        {/* <section id="testimonials">
          <Testimonials data={this.state.resumeData.testimonials}/>
        </section> */}
        <section id="more-about-me">
          <MoreAboutMe data={this.state.resumeData.moreAboutMe}/> {/* Add the new component */}
        </section>
        <section id="contact">
          <Contact data={this.state.resumeData.main}/>
        </section>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;