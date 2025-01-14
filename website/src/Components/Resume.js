import React, { Component } from 'react';
import './Resume.css'; // Import the CSS file

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTechnology: null,
      selectedProjects: [],
      selectedAbout: ''
    };
  }

  handleTechnologyClick = (technology) => {
    this.setState({
      showModal: true,
      selectedTechnology: technology.name,
      selectedProjects: technology.projects,
      selectedAbout: technology.about
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedTechnology: null,
      selectedProjects: [],
      selectedAbout: ''
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
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
                  <p style={{ margin: 0, marginRight: '10px' }}>Check out my honors thesis</p>
                  <i className="fa fa-arrow-down" style={{ fontSize: '1.5em', margin: '0 5px' }}></i>
                  <i className="fa fa-arrow-down" style={{ fontSize: '1.5em', margin: '0 5px' }}></i>
                  <i className="fa fa-arrow-down" style={{ fontSize: '1.5em', margin: '0 5px' }}></i>
                </div>
                <a href={education.publication.url} className="resumebutton" target="_blank" rel="noopener noreferrer">
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
              <span className="close" onClick={this.closeModal}>&times;</span>
              <h2>{this.state.selectedTechnology}</h2>
              <p style={{ fontSize: '0.9em', fontStyle: 'italic' }}>{this.state.selectedAbout}</p> {/* Display about information */}
              <hr style={{ border: '0.5px solid #ccc' }} /> {/* Faint line */}
              <ul>
                {this.state.selectedProjects.map((project, index) => (
                  <li key={index}>
                    <h4>{project.title}</h4> {/* Make project titles smaller */}
                    <p>{project.description}</p>
                    <p><strong>Course:</strong> {project.course}</p> {/* Display course information */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Resume;