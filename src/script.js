const socket = new WebSocket('ws://localhost:3000/');

socket.onopen = function(event) {
  console.log('WebSocket connection opened');
};

socket.onmessage = function(event) {
  const receivedMessage = event.data;
  displayIncomingMessage(receivedMessage);
};

socket.onclose = function(event) {
  console.log('WebSocket connection closed');
};

document.getElementById('send-button').addEventListener('click', function() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;
  displayOutgoingMessage(message);
  socket.send(message);
  messageInput.value = '';
});

function displayIncomingMessage(message) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('user-message');
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
}

function displayOutgoingMessage(message) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
}