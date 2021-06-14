const express = require('express');
const router = express.Router()

router.get('/',(req,res) =>{
    // Send all movies to user
    console.log('sending all movies to user')
})


router.get('/search/:movie',(req,res) =>{
    // Search for user input
    console.log(`searching for ${req.params['movie']}`)
})

module.exports = router
