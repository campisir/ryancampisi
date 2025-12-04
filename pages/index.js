import React, { Component } from 'react';
import Head from 'next/head';
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';
import About from '../src/Components/About';
import Resume from '../src/Components/Resume';
import Contact from '../src/Components/Contact';
import Portfolio from '../src/Components/Portfolio';
import MoreAboutMe from '../src/Components/MoreAboutMe';
import { logEvent } from '../src/utils/logging';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      resumeData: props.resumeData || {}
    };
  }

  componentDidMount() {
    if (window.gtag) {
      window.gtag('config', 'G-HN847L26DC', {
        page_path: window.location.pathname,
      });
    }
    
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
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Ryan Campisi - Software Engineer</title>
          <meta name="description" content="Ryan Campisi's portfolio - Software Engineer specializing in full-stack development" />
          <meta property="og:title" content="Ryan Campisi - Software Engineer" />
          <meta property="og:description" content="Software Engineer specializing in full-stack development" />
          <meta property="og:url" content="https://www.ryancampisi.com" />
          <meta property="og:type" content="website" />
        </Head>
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
      </>
    );
  }
}

// This runs at build time on the server
export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  // Read resumeData.json from public directory
  const filePath = path.join(process.cwd(), 'public', 'resumeData.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const resumeData = JSON.parse(jsonData);
  
  return {
    props: {
      resumeData
    }
  };
}

export default MainPage;
