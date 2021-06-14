const mongoose= require('mongoose')
const Movie = require('./models/moviemdl')
const uri = "mongodb+srv://dboi:Exkiller444@cluster0.pon7o.mongodb.net/MoviesDB?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) =>{
        // things to do after connection
        console.log('connected!!')
    })
    .catch((error) => {
        // output error
        console.log(error)
    })