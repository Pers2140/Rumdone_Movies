var socket = io.connect('http://212.227.9.59:8080');
//Query DOM

var message = document.getElementById('message'),
  user = document.getElementById('user'),
  output = document.getElementById('output'),
  btn = document.getElementById('send'),
  users = document.getElementById('users');


//Emit events
btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    user: user.value
  })
  message.value = " "
});

socket.on('chat', (data) => {
  var html = ""
  for (var i = 0; i < data.current_users.length; i++) {
    html += `✔️ ${data.current_users[i]}</br>`
  }
  users.innerHTML = html
  output.innerHTML += `<strong> ${data.user} </strong>: ${data.message}<br>`

})
