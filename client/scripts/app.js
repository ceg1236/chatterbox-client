// YOUR CODE HERE:

var app = {
  init: function() {},
  send: function() {
    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'POST',
      data:JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('Message sent');
      },
      error: function(data) {
        console.log('Failed to send');
      }
    });
  },
  fetch: function() {
    $.ajax({
      // url: "https://api.parse.com/1/classes/chatterbox",
      // ???
      type: 'GET',
      // data:JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('Message received');
      },
      error: function(data) {
        console.log('Failed to send');
      }
    });
  },
  display: function(){}
} ;
var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};
