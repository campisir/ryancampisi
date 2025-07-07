import React, { Component } from 'react';

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
  };

  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map((projects) => {
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a 
              href={projects.url} 
              title={projects.title}
              onClick={() => this.trackProjectClick(projects.title, projects.url)}
            >
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;
