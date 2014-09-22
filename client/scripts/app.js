// YOUR CODE HERE:
// $(document).ready(function() {


  var app = {
    server: "https://api.parse.com/1/classes/chatterbox",
    init: function() {
      this.fetch()
    },
    send: function() {
      $.ajax({
        url: this.server,
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
        url: this.server,
        type: 'GET',
        data:JSON.stringify(message),
        contentType: 'application/json',
        success: function(data) {
          $('#chats li').remove();

          $.each(data.results, function(index, msgObj){
            $('#chats').append('<li>'+ msgObj.username +': '+msgObj.text + ' |from: '+ msgObj.roomname +'</li>');
          });
          console.log('Message received');
        },
      });
    },
    clearMessages: function() {
      $('#chats').empty();
    },
    addMessage: function(msg) {
      $('#chats').append('<li>'+msg.username+' '+msg.text+
        ' '+msg.roomname+'</li>');
    },
    addRoom: function(rmname) {
      $('#roomSelect').append("<div class='room'></div>");
    },
    display: function(){}
  } ;

app.init();



  var message = {
    username: 'Mel Brooks',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
  };
// });

// HTML will include a display elmt, an input box,
//  and submit button.
//  Display elmt - ul populated w li where each msg
//                is li
// Input box - input tag
// Submit button - when clicked, call
//                  send function with msg
//
// Every so often aka setTimeout...
  // call clear, fetch, and display to our DOM-display
  //
// Event handler - click submit take any input text,
    //save to var, stringify, put in msg.text prop
    // pass in var to .send
