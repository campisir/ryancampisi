import React, { Component } from 'react';

class Resume extends Component {
  render() {

    if(this.props.data){
      var education = this.props.data.education.map(function(education){
        var descriptionPoints = education.description.map(function(point, index){
          return <li key={index}>{point}</li>;
        });

        return (
          <div key={education.school}>
            <h3>{education.school}</h3>
            <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
            <ul className="education-description">{descriptionPoints}</ul>
          </div>
        );
      });
      var skillmessage = this.props.data.skillmessage;
      var work = this.props.data.work.map(function(work){
        return <div key={work.company}><h3>{work.company}</h3>
            <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
            <p>{work.description}</p>
        </div>
      })
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

      {/* Commented out the skills section
      <div className="row skill">

         <div className="three columns header-col">
            <h1><span>Skills</span></h1>
         </div>

         <div className="nine columns main-col">

            <p>{skillmessage}
            </p>

            <div className="bars">
               <ul className="skills">
                  {skills}
                </ul>
            </div>
         </div>
      </div>
      */}
   </section>
    );
  }
}

export default Resume;
