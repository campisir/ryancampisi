/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($) {

   /*----------------------------------------------------*/
   /* FitText Settings
   ------------------------------------------------------ */
   
       setTimeout(function() {
          $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
        }, 100);
   
   
   /*----------------------------------------------------*/
   /* Smooth Scrolling
   ------------------------------------------------------ */
   
      $('.smoothscroll').on('click',function (e) {
           e.preventDefault();
   
           var target = this.hash,
           $target = $(target);
   
           if ($target.length) { // Check if target exists
               $('html, body').stop().animate({
                   'scrollTop': $target.offset().top
               }, 800, 'swing', function () {
                   window.location.hash = target;
               });
           }
       });
   
   
   /*----------------------------------------------------*/
   /* Highlight the current section in the navigation bar
   ------------------------------------------------------*/
   
       var sections = $("section");
       var navigation_links = $("#nav-wrap a");
   
       sections.waypoint({
   
         handler: function(event, direction) {
   
              var active_section;
   
               active_section = $(this);
               if (direction === "up") active_section = active_section.prev();
   
               var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
   
            navigation_links.parent().removeClass("current");
               active_link.parent().addClass("current");
   
           },
           offset: '35%'
   
       });
   
   
   /*----------------------------------------------------*/
   /*  Make sure that #header-background-image height is
   /* equal to the browser height.
   ------------------------------------------------------ */
   
      $('header').css({ 'height': $(window).height() });
      $(window).on('resize', function() {
   
           $('header').css({ 'height': $(window).height() });
           $('body').css({ 'width': $(window).width() })
      });
   
   
   /*----------------------------------------------------*/
   /*  Fade In/Out Primary Navigation
   ------------------------------------------------------*/
   
      $(window).on('scroll', function() {
   
           var h = $('header').height();
           var y = $(window).scrollTop();
         var nav = $('#nav-wrap');
   
          if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
             nav.fadeOut('fast');
          }
         else {
            if (y < h*.20) {
               nav.removeClass('opaque').fadeIn('fast');
            }
            else {
               nav.addClass('opaque').fadeIn('fast');
            }
         }
   
       });
   
   
   /*----------------------------------------------------*/
   /*  Modal Popup
   ------------------------------------------------------*/
   
       $('.item-wrap a').magnificPopup({
   
          type:'inline',
          fixedContentPos: false,
          removalDelay: 200,
          showCloseBtn: false,
          mainClass: 'mfp-fade'
   
       });
   
       $(document).on('click', '.popup-modal-dismiss', function (e) {
               e.preventDefault();
               $.magnificPopup.close();
       });
   
   
   /*----------------------------------------------------*/
   /*  Flexslider
   /*----------------------------------------------------*/
      $('.flexslider').flexslider({
         namespace: "flex-",
         controlsContainer: ".flex-container",
         animation: 'slide',
         controlNav: true,
         directionNav: false,
         smoothHeight: true,
         slideshowSpeed: 7000,
         animationSpeed: 600,
         randomize: false,
      });
   
   /*----------------------------------------------------*/
   /*  contact form
   ------------------------------------------------------*/
   
   $('form#contactForm button.submit').click(function (e) {
      e.preventDefault(); // Prevent default form submission behavior

      // Get the form values
      var contactName = $('#contactForm #contactName').val().trim();
      var contactEmail = $('#contactForm #contactEmail').val().trim();
      var contactSubject = $('#contactForm #contactSubject').val().trim();
      var contactMessage = $('#contactForm #contactMessage').val().trim();

      // Validate the fields
      if (!contactName || !contactEmail || !contactMessage) {
         $('#message-warning').html('Please fill out all required fields.').fadeIn();
         $('#image-loader').fadeOut();
         return false;
      }

      // Simple email validation
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(contactEmail)) {
         $('#message-warning').html('Please enter a valid email address.').fadeIn();
         $('#image-loader').fadeOut();
         return false;
      }

      // Prepare the data for the API request
      var data = JSON.stringify({
         email: `${contactEmail} (${contactName})`, // Append contact name to email
         message: `${contactSubject} - ${contactMessage}`, // Prepend subject to message
         website: "ryancampisi.com" // Specify the website
      });

      // Make the AJAX request to your email service
      $.ajax({
         type: "POST",
         url: "https://flame-picks-production-api.onrender.com/mail/send-email",
         data: data,
         contentType: "application/json", // Specify JSON content type
         success: function (response) {
            if (response.message === 'Email sent successfully') {
                  $('#image-loader').fadeOut();
                  $('#message-warning').hide();
                  $('#contactForm').fadeOut();
                  $('#message-success').fadeIn();
            } else {
                  $('#image-loader').fadeOut();
                  $('#message-warning').html('An unexpected error occurred.');
                  $('#message-warning').fadeIn();
            }
         },
         error: function (xhr, status, error) {
            $('#image-loader').fadeOut();
            $('#message-warning').html('Failed to send email. Please try again.');
            $('#message-warning').fadeIn();
            console.error('Error:', error);
         }
      });

      return false;
   });

   
   });