// YOUR CODE HERE:
$(document).ready(function() {


  var app = {
    server: "https://api.parse.com/1/classes/chatterbox",
    room: 'lobby',
    name: prompt("What's your name?"),

    init: function() {
      app.fetch();
      $('.SubmitButton').on('click', function(){
        var msgToSend =  $('#MessageInput').val();

        var msgToServer = JSON.stringify({
          username: app.name,     // fix this
          text: msgToSend,
          roomname: app.room
        });
        console.log(msgToServer);
        app.send(msgToServer);
        $('#MessageInput').val('');
      });
    },

    send: function(message) {
      // debugger;
      $.ajax({
        url: app.server,
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

    fetch: function(callback) {
      $.ajax({
        url: app.server,
        type: 'GET',
        data: {
          order: '-createdAt',
          limit: 10
        },
        contentType: 'application/json',
        success: function(data) {
          // if we have a roomname
          // fetch and display only msgs with that rm prop
          // else display all msgs

          callback(data);

        },
      });
    },


    addRoom: function(rmname) {
      console.log('room');
      $('#sidebar').append(newRoom);
      var newRoom = app.display(rmname);


    },

    // pass the data into roomDisplay, have the room already chosen so already passing in the appropriate data
    roomDisplay: function(roomname, data){
      $('#sidebar li').remove();
      var roomData = {
        results: []
      };
      // ISSUE: need the object passed into each to contain that particular room's messages
      $.each(data.results, function(index, msgObj){
        console.log('roomData.results in roomDisplay is ', roomData.results);
        if (msgObj.roomname === roomname){
          roomData.results.push(msgObj);
        }
      });
      $.each(roomData.results, function(index, msgObj){
        $('#sidebar').append('<li>'+ _.escape(msgObj.username) +': ' + _.escape(msgObj.text) + ' |from: '+
          '<a class="room" href="#MessageInput">' + _.escape(msgObj.roomname) + '</a>'+'</li>');
      });
      $container = $('.container');
      $('.container').animate({ scrollTop: $container[$container.length-1].scrollHeight }, "slow");
    },

     display: function(data){
      // After init, after fetching messages, this will take the fetched data and return MOST RECENT messages
      // $('#chats li').remove();

      $.each(data.results, function(index, msgObj){
        $('#chats').append('<li>'+ _.escape(msgObj.username) +': ' + _.escape(msgObj.text) + ' |from: '+
          '<a class="room" href="#MessageInput">' + _.escape(msgObj.roomname) + '</a>'+'</li>');
      });
      $container = $('.container');
      $('.container').animate({ scrollTop: $container[$container.length-1].scrollHeight }, "slow");
    }
  } ;

  app.init();
  setInterval(function(){
    app.fetch(app.display);
  }, 5000);



  $('#chats').on('click', 'a', function() {
    var rm = $(this).text();

    app.fetch(function(data){
      test = data;
      console.log('data issss ', data);
      app.roomDisplay(rm, data);
    }); // when we click here, the page refreshes our msgs
    // we don't want that??
  });

});

// Created a new div for appending rooms - we were trying to just append
// to our current li elmts, which didn't work/make sense
//
// Need to fix our event handler on <a>
// when we click it fetches and refreshes the page, we just want it
// to append to our sidebar
// Tried to fix little issues with clicking the roomname
// (where it sends the page, what refresh)

// Rooms:
// Make the room clickable in chat
// On click, display only the messages in that room
// -- To do this, do some sort of fetch, but only display those msgs
//     from that room (via for-loop / each search??)
// Add another input and button to create rooms
