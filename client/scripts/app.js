// YOUR CODE HERE:
$(document).ready(function() {


  var app = {
    server: "https://api.parse.com/1/classes/chatterbox",
    room: 'lobby',
    name: prompt("What's your name?"),

    init: function() {
      this.fetch();
    },

    send: function(message) {
      // debugger;
      $.ajax({
        url: this.server,
        type: 'POST',
        data: message,
        contentType: 'application/json',
        success: function(data) {
          console.log('Message sent');
        },
        error: function(data) {
          console.log('Failed to send!!!');
        }
      });
    },

    fetch: function() {
      $.ajax({
        url: this.server,
        type: 'GET',
        data: {
          order: '-createdAt',
          limit: 10
        },
        contentType: 'application/json',
        success: function(data) {

          $('#chats li').remove();

          console.log(data.results);
          $.each(data.results, function(index, msgObj){
            // debugger;
            $('#chats').append('<li>'+ msgObj.username +': '+msgObj.text + ' |from: '+ msgObj.roomname +'</li>');
          });
          console.log('Message received');
        },
      });
    },

    // Probably dont need:...
    // clearMessages: function() {
    //   $('#chats').empty();
    // },

    // addMessage: function(msg) {
    //   $('#chats').append('<li>'+msg.username+' '+msg.text+
    //     ' '+msg.roomname+'</li>');
    // },

    addRoom: function(rmname) {
      $('#roomSelect').append("<div class='room'></div>");
    },

    display: function(){
      // After init, after fetching messages, this will take the fetched data and return MOST RECENT messages
      this.fetch();
    }
  } ;

  app.init();
  setInterval(function(){
    app.fetch();
  }, 5000);

  $('.SubmitButton').on('click', function(){
    var msgToSend =  $('.MessageInput').val();

    var msgToServer = JSON.stringify({
      username: app.name,     // fix this
      text: msgToSend,
      roomname: app.room
    });
    console.log(msgToServer);
    app.send(msgToServer);
    $('.MessageInput').val('');
  });

});

// Rooms:
// Make the room clickable in chat
// On click, display only the messages in that room
// -- To do this, do some sort of fetch, but only display those msgs
//     from that room (via for-loop / each search??)
// Add another input and button to create rooms
