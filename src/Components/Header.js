import React, { Component } from 'react';

class Header extends Component {

  trackNavClick = (sectionName) => {
    if (window.gtag) {
      window.gtag('event', 'navigation_click', {
        event_category: 'Navigation',
        event_label: `${sectionName} Menu Click`,
        nav_section: sectionName
      });
    }
  };

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var occupation= this.props.data.occupation;
      var description= this.props.data.description;
      var city= this.props.data.address.city;
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
    }

   return (
     <header id="home">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        poster="images/video-poster.png"
        id="myVideo" 
        style={{ position: "absolute", right: 0, bottom: 0, minWidth: "50%", minHeight: "50%" }}
      >
        <source src="images/websitedrones.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

     <nav id="nav-wrap">

       <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
        <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

       <ul id="nav" className="nav">
         <li className="current">
           <a 
             className="smoothscroll" 
             href="#home"
             onClick={() => this.trackNavClick('Home')}
           >
             Home
           </a>
         </li>
         <li>
           <a 
             className="smoothscroll" 
             href="#about"
             onClick={() => this.trackNavClick('About')}
           >
             About
           </a>
         </li>
         <li>
           <a 
             className="smoothscroll" 
             href="#resume"
             onClick={() => this.trackNavClick('Resume')}
           >
             Resume
           </a>
         </li>
         {<li>
           <a 
             className="smoothscroll" 
             href="#portfolio"
             onClick={() => this.trackNavClick('Projects')}
           >
             Projects
           </a>
         </li>}
         {/* <li><a className="smoothscroll" href="#testimonials">Testimonials</a></li> */}
         <li>
           <a 
             className="smoothscroll" 
             href="#more-about-me"
             onClick={() => this.trackNavClick('More')}
           >
             More
           </a>
         </li> {/* Ensure the ID matches */}
         <li>
           <a 
             className="smoothscroll" 
             href="#contact"
             onClick={() => this.trackNavClick('Contact')}
           >
             Contact
           </a>
         </li>
       </ul>

     </nav>

     <div className="row banner">
       <div className="banner-text">
         <h1 className="responsive-headline">I'm {name}.</h1>
         <h3>I'm a <span>software developer</span> and <span>mathematician</span> based in Florida.</h3>
         <hr />
         {/* <ul className="social">
            {networks}
         </ul> */}
       </div>
     </div>

     <p className="scrolldown">
       <a 
         className="smoothscroll" 
         href="#about"
         onClick={() => this.trackNavClick('Scroll Down Arrow')}
       >
         <i className="icon-down-circle"></i>
       </a>
     </p>

   </header>
   );
  }
}

export default Header;