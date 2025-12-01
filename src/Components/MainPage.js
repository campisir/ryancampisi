import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Resume from './Resume';
import Contact from './Contact';
import Testimonials from './Testimonials';
import Portfolio from './Portfolio';
import MoreAboutMe from './MoreAboutMe';
import { logEvent } from '../utils/logging';

class MainPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      resumeData: {}
    };
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
    
    // Track referrer information and log site load
    this.trackSiteLoadWithReferrer();
    
    // Set up Intersection Observer for section tracking
    this.setupSectionTracking();
  }

  trackSiteLoadWithReferrer = () => {
    const referrer = document.referrer;
    let referrerSource = 'Direct/Unknown';
    let siteLoadMessage = 'User visited ryancampisi.com';
    
    if (referrer) {
      try {
        const referrerUrl = new URL(referrer);
        const hostname = referrerUrl.hostname.toLowerCase();
        
        // Categorize common referrer sources
        if (hostname.includes('linkedin.com')) {
          referrerSource = 'LinkedIn';
        } else if (hostname.includes('github.com')) {
          referrerSource = 'GitHub';
        } else if (hostname.includes('google.com') || hostname.includes('google.')) {
          referrerSource = 'Google Search';
        } else if (hostname.includes('bing.com')) {
          referrerSource = 'Bing Search';
        } else if (hostname.includes('facebook.com')) {
          referrerSource = 'Facebook';
        } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
          referrerSource = 'Twitter/X';
        } else if (hostname.includes('reddit.com')) {
          referrerSource = 'Reddit';
        } else if (hostname.includes('stackoverflow.com')) {
          referrerSource = 'Stack Overflow';
        } else {
          referrerSource = hostname;
        }
        
        siteLoadMessage = `User visited ryancampisi.com from ${referrerSource} (${referrer})`;
        
        // Track with Google Analytics
        if (window.gtag) {
          window.gtag('event', 'referrer_visit', {
            event_category: 'Traffic Source',
            event_label: referrerSource,
            referrer_url: referrer,
            referrer_hostname: hostname
          });
        }
        
      } catch (error) {
        console.warn('Error parsing referrer URL:', error);
        siteLoadMessage = `User visited ryancampisi.com from unparseable referrer: ${referrer}`;
        
        // Still log that there was a referrer, even if we couldn't parse it
        if (window.gtag) {
          window.gtag('event', 'referrer_visit', {
            event_category: 'Traffic Source',
            event_label: 'Unparseable Referrer',
            referrer_url: referrer
          });
        }
      }
    } else {
      // No referrer - direct visit, bookmark, or typed URL
      siteLoadMessage = 'User visited ryancampisi.com directly';
      
      if (window.gtag) {
        window.gtag('event', 'referrer_visit', {
          event_category: 'Traffic Source',
          event_label: 'Direct/Unknown'
        });
      }
    }
    
    // Log site load with referrer information
    logEvent('Site Load', siteLoadMessage);
  };

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
      <div className="MainPage">
        <Header data={this.state.resumeData.main}/>
        <section id="about">
          <About data={this.state.resumeData.main}/>
        </section>
        <section id="resume">
          <Resume data={this.state.resumeData.resume}/>
        </section>
        <section id="portfolio">
          <Portfolio data={this.state.resumeData.portfolio}/>
        </section>
        <section id="more-about-me">
          <MoreAboutMe data={this.state.resumeData.moreAboutMe}/>
        </section>
        <section id="contact">
          <Contact data={this.state.resumeData.main}/>
        </section>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default MainPage;