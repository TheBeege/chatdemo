var socket = io();

var sendButton = document.getElementById("send");
var nameInput = document.getElementById("nameinput");
var messageInput = document.getElementById("messageinput");

// if user clicks "Send" button, send message
sendButton.addEventListener("click", sendMessage);

// if ENTER key was pressed, send message
window.addEventListener("keypress", function(event){
	if (event.which === 13) {
		sendMessage();
	}
});

// when "chat" event received, display message
socket.on('chat', function(data){
    console.log('RECEIVED: name: '+ data.name + ', message: ' + data.message + ', timestamp: ' + data.timestamp);
	displayNewMessage(data.name, data.message, data.timestamp);
});


function sendMessage(event) {
	console.log('SENDING: name: '+ nameInput.value + ', message: ' + messageInput.value);
	socket.emit('chat', {name: nameInput.value, message: messageInput.value, timestamp: moment().format("HH:mm:ss")} );
}

function displayNewMessage (username, message, timestamp) {
  var newMessage = document.createElement('div');
  newMessage.className = 'message';
  var messageTextNode = document.createTextNode(': ' + message);

  var newMessageUser = document.createElement('span');
  newMessageUser.className = 'username';
  newMessageUser.innerText = username + ' ' + timestamp.toString();
  newMessage.appendChild(newMessageUser);
  newMessage.appendChild(messageTextNode);

  document.getElementById('chat').appendChild(newMessage);

  window.scrollTo(0,document.body.scrollHeight);
}
