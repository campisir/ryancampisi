import React, { Component } from 'react';
import './Portfolio.css';
import { logEvent } from '../utils/logging';

class Portfolio extends Component {

  trackProjectClick = (projectTitle, projectUrl) => {
    if (window.gtag) {
      window.gtag('event', 'portfolio_click', {
        event_category: 'Portfolio',
        event_label: `Project Click: ${projectTitle}`,
        project_title: projectTitle,
        project_url: projectUrl
      });
    }
    
    // Log portfolio project click
    logEvent('Portfolio Project Click', `User clicked on project: ${projectTitle}`);
  };

  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map((projects, index) => {
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="portfolio-card">
           <div className="card-inner">
            <div className="card-image">
              <img alt={projects.title} src={projectImage} />
              <div className="card-overlay">
                <a 
                  href={projects.url} 
                  title={projects.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => this.trackProjectClick(projects.title, projects.url)}
                  className="card-link"
                >
                  <i className="fa fa-external-link"></i>
                  <span>View Project</span>
                </a>
              </div>
            </div>
            <div className="card-content">
              <h3>{projects.title}</h3>
              <p>{projects.category}</p>
            </div>
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns">
            <h1>Featured Projects</h1>
            <p className="portfolio-intro">
              Here are some of my favorite projects that showcase my technical skills and creativity.
            </p>
            <div className="portfolio-grid">
                {projects}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
