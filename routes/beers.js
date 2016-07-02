"use strict;"


let express = require('express');

let router = express.Router();
var request = require('request');


router.get('/', (req,res) => {
  request('http://api.brewerydb.com/v2/beer/random?key=676e05c24ac5399c33bfa0efa57d75d5&format=jsonp', function(err,response, body) {
    // console.log(body); 
    if(err) return res.status(400).send(err);
    res.send(body);
  })
})

module.exports = router;

