import React, { Component } from 'react';
import { logEvent } from '../utils/logging';

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTechnology: null,
      selectedProjects: [],
      selectedAbout: '',
      mainProject: null,
      showMoreTechnologies: false
    };
  }

  handleTechnologyClick = (technology) => {
    // Look for a featured project
    const featuredProjectIndex = technology.projects.findIndex(project => project.featured === true);
    
    let mainProject = null;
    let otherProjects = [...technology.projects];
    
    if (featuredProjectIndex !== -1) {
      // Use the featured project as main project
      mainProject = technology.projects[featuredProjectIndex];
      otherProjects.splice(featuredProjectIndex, 1);
    }
    // If no featured project, all projects go in the "other projects" section
    
    this.setState({
      showModal: true,
      selectedTechnology: technology.name,
      selectedProjects: otherProjects,
      selectedAbout: technology.about,
      mainProject: mainProject
    });
  };

  handleMoreTechnologiesClick = () => {
    this.setState({
      showMoreTechnologies: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedTechnology: null,
      selectedProjects: [],
      selectedAbout: '',
      mainProject: null
    });
  };

  closeMoreTechnologies = () => {
    this.setState({
      showMoreTechnologies: false
    });
  };

  render() {
    if (this.props.data) {
      var education = this.props.data.education.map((education) => {
        var descriptionPoints = education.description.map((point, index) => {
          if (typeof point === 'string') {
            return <li key={index}>{point}</li>;
          } else if (point.technologies) {
            return (
              <li key={index}>
                Technologies:
                <ul className="technologies-list">
                  {point.technologies.map((tech, techIndex) => (
                    <li key={techIndex} onClick={() => this.handleTechnologyClick(tech)} style={{ cursor: 'pointer', color: 'black' }}>
                      {tech.name}
                    </li>
                  ))}
                  <li key="more" onClick={this.handleMoreTechnologiesClick} style={{ cursor: 'pointer', color: 'black', fontWeight: 'bold' }}>
                    More
                  </li>
                </ul>
              </li>
            );
          }
          return null;
        });

        return (
          <div key={education.school}>
            <h3>{education.school}</h3>
            <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
            <ul className="education-description">{descriptionPoints}</ul>
            {education.publication && (
              <div className="publication">
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1em' }}>
                  <p style={{ margin: 0, marginRight: '10px' }}>Check out my honors thesis</p>
                  <i className="fa fa-arrow-down" style={{ fontSize: '1.3em', margin: '0 5px' }}></i>
                  <i className="fa fa-arrow-down" style={{ fontSize: '1.3em', margin: '0 5px' }}></i>
                  <i className="fa fa-arrow-down" style={{ fontSize: '1.3em', margin: '0 5px' }}></i>
                </div>
                <a 
                  href={education.publication.url} 
                  className="resumebutton" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => logEvent('Thesis Link Click', 'User clicked on honors thesis link')}
                >
                  <i className="fa fa-file-text-o"></i> {education.publication.title}
                </a>
              </div>
            )}
          </div>
        );
      });

      var skillmessage = this.props.data.skillmessage;
      var work = this.props.data.work.map((work) => {
        return (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
            <p>{work.description}</p>
          </div>
        );
      });
    }

    return (
      <section id="resume">
        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                {education}
              </div>
            </div>
          </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>

          <div className="nine columns main-col">
            {work}
          </div>
        </div>

        {this.state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={this.closeModal}>&times;</span>
                <h2>{this.state.selectedTechnology}</h2>
                <p className="about-text">{this.state.selectedAbout}</p>
              </div>
              <div className="modal-body">
                {this.state.mainProject && (
                  <div className="main-project">
                    <h3>{this.state.mainProject.title}</h3>
                    <div className="course">{this.state.mainProject.course}</div>
                    <p className="description">{this.state.mainProject.description}</p>
                    {this.state.mainProject.link && (
                      <a 
                        href={this.state.mainProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                      >
                        {this.state.mainProject.link_text || 'View Project'}
                      </a>
                    )}
                  </div>
                )}
                {this.state.selectedProjects.length > 0 && (
                  <div className="other-projects">
                    <h4>{this.state.mainProject ? 'Other Projects' : 'Projects'}</h4>
                    {this.state.selectedProjects.map((project, index) => (
                      <div key={index} className="project-item">
                        <h5>{project.title}</h5>
                        <div className="course">{project.course}</div>
                        <p className="description">{project.description}</p>
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="project-link"
                          >
                            {project.link_text || 'View Project'}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {this.state.showMoreTechnologies && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={this.closeMoreTechnologies}>&times;</span>
                <h2>Additional Technologies</h2>
                <p className="about-text">Other technologies and tools I gained experience with during my education</p>
              </div>
              <div className="modal-body">
                <div className="more-technologies-grid">
                  {this.props.data && this.props.data.education[0].description[1].additionalTechnologies && 
                    this.props.data.education[0].description[1].additionalTechnologies.map((tech, index) => (
                      <div key={index} className="tech-item">
                        {tech}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Resume;