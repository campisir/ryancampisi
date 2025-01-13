import React, { Component } from 'react';
import ReactGA from 'react-ga';
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

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

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

  componentDidMount(){
    this.getResumeData();
  }

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
        <section id="more-about-me">
          <MoreAboutMe data={this.state.resumeData.moreAboutMe}/> {/* Add the new component */}
        </section>
        {/* <section id="portfolio">
          <Portfolio data={this.state.resumeData.portfolio}/>
        </section> */}
        {/* <section id="testimonials">
          <Testimonials data={this.state.resumeData.testimonials}/>
        </section> */}
        <section id="contact">
          <Contact data={this.state.resumeData.main}/>
        </section>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;