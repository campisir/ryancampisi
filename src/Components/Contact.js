import React, { Component } from 'react';

class Contact extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    
    // Track form submission
    if (window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'Contact',
        event_label: 'Contact Form Submission'
      });
    }
    
    // Add your form submission logic here
    console.log('Contact form submitted');
  };

  handleInputFocus = (fieldName) => {
    // Track form field interactions
    if (window.gtag) {
      window.gtag('event', 'form_field_focus', {
        event_category: 'Contact',
        event_label: `${fieldName} Field Focus`,
        form_field: fieldName
      });
    }
  };

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    } else {
      var name = '';
      var street = '';
      var city = '';
      var state = '';
      var zip = '';
      var phone = '';
      var email = '';
      var message = '';
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form action="" method="post" id="contactForm" name="contactForm" onSubmit={this.handleSubmit}>
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input 
                     type="text" 
                     defaultValue="" 
                     size="35" 
                     id="contactName" 
                     name="contactName" 
                     onChange={this.handleChange}
                     onFocus={() => this.handleInputFocus('Name')}
                   />
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input 
                     type="text" 
                     defaultValue="" 
                     size="35" 
                     id="contactEmail" 
                     name="contactEmail" 
                     onChange={this.handleChange}
                     onFocus={() => this.handleInputFocus('Email')}
                   />
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input 
                     type="text" 
                     defaultValue="" 
                     size="35" 
                     id="contactSubject" 
                     name="contactSubject" 
                     onChange={this.handleChange}
                     onFocus={() => this.handleInputFocus('Subject')}
                   />
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea 
                       cols="50" 
                       rows="15" 
                       id="contactMessage" 
                       name="contactMessage"
                       onFocus={() => this.handleInputFocus('Message')}
                     ></textarea>
                  </div>

                  <div>
                     <button 
                       className="submit" 
                       type="submit"
                       onClick={() => {
                         if (window.gtag) {
                           window.gtag('event', 'button_click', {
                             event_category: 'Contact',
                             event_label: 'Submit Button Click'
                           });
                         }
                       }}
                     >
                       Submit
                     </button>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning"> Error</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Contact</h4>
					   <p className="address">
						   {name}<br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>

               
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
