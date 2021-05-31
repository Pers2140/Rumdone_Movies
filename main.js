const fs = require('fs')
const express = require('express');
const app = express();
const chatapp = express();
const moment = require('moment');
const path = require('path');
const http = require('http').createServer(chatapp);
const io = require('socket.io')(http);
const cors = require('cors')

chatapp.use(cors())


// Main site port
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// EJS view engine
app.set('view engine', 'ejs')


// middleware logging IP address
// const logger = (req, res, next) => {
//   // console.log(`using ${req.ip}`);
//   fs.appendFile('log_file.txt', `IP: ${req.ip} \n`,(err)=>{})
//   next();
// };

// app.use(logger)


console.log("server coming online ...")
//static folder
app.use(express.static(path.join(__dirname, '.')));
console.log("server online")

//request for home page
app.get('/', (req, res) => {
  res.render('movies')
});
//request for profile page
app.get('/profile', (req, res) => {
  res.render('profile')
});
//request for chatapp page
app.get('/chatapp', (req, res) => {
  res.render('chatapp')
});
//request for movies page
app.get('/movies', (req, res) => {
  res.render('movies')
});
//request for shows page
app.get('/shows', (req, res) => {
  res.render('shows')
});

// 404 page
app.use((req, res) => {
  res.render('404_page')
});


//chatapp
var time = moment().format('MMMM Do YYYY, h:mm:ss a'); // time
http.listen(8080, function () {
  console.log('listening for users on 8080')
})
var current_users = {};
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected on ${time}`);
  //logging
  fs.appendFile('log_file.txt', (`user ${socket.handshake.address} connected on ${time}` + "\n"), () => { })

  socket.on('chat', (data) => {
    //logging
    fs.appendFile('log_file.txt', (`IP:(${socket.handshake.address})\n | user - ${data.user} | said - ${data.message}` + "\n"), () => { })
    console.log(data)
    if (Object.keys(current_users).includes(data.user)) {
      if (current_users[data.user] != socket.id) {
        data.user += '_clone💩'
      }
    }
    if (!Object.values(current_users).includes(data.user)) {
      current_users[data.user] = socket.id
      data.current_users = Object.keys(current_users)
    }

    // 11 days & clear chat log
    setTimeout(() => { current_users = {}; }, 1000000000);


    //console.log(current_users)
    io.sockets.emit('chat', data);
  });
})
