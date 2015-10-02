'use strict';
  
angular.module('devfestApp')
  .factory('Config', function() {
    return {
      // modify these
      'name'          : 'GDG Kansas City', // the name of your GDG
      'email'         : 'gdgkansascity@gmail.com', // the email where you receive GDG emails
      'id'            : '116015988631052616691', // Google+ profile id for the GDG
      'googleAPI'     : 'AIzaSyB3g3Fr3M56bILSK2aqn6arqU1CQt1zb3E', // Google API Key
      'website'       : 'http://gdgkc.org', // GDG website, custom domain or [your-app].appspot.com
      
      // event details
      'eventName'     : 'GDG DevFest KC', // typically 'DevFest [place]'
      'eventLocation' : 'Jack Reardon Convention Center', // location of event
      'eventAddress'  : '520 Minnesota Ave, Kansas City, KS 66101', // address of event
      'eventURL'      : 'http://devfest.gdgkc.org', // link to event website (ex. G+, Meetup, Eventbrite, etc)
      'eventEmail'    : 'devfest@gdgkc.org', // Email where event inquries should go
      'speakerURL'    : 'https://docs.google.com/forms/d/1cf_qfEmEE7GeAVltMjZbMuQtopdavqdMfPhb0z2dJJg/viewform', // URL for the 'Call for Papers' form
      'ticketURL'     : '', // link to buy tickets
      'eventDate'     : '2015-12-05', // ISO formatted YYYY-MM-DD (currently only supports a single day DevFest)
      'eventStart'    : '09:00:00', // start time
      'eventEnd'      : '16:00:00', // end time
      'sessionLength' : '2700000', // use minutes in milliseconds
      
      // social details
      // Google+ social details are derived from the keys above
      'twitter'       : 'GDGKansasCity', // Twitter handle
      'facebook'      : 'GDGKansasCity', // Facebook handle
      'meetup'        : 'GDG-Kansas-City', // Meetup handle
      'github'        : 'GDGKansasCity', // GitHub Handle
    };
  });