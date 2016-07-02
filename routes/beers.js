"use strict;"


let express = require('express');

let router = express.Router();
var request = require('request');


router.get('/', (req,res) => {
  request('http://api.brewerydb.com/v2/beer/random?key=6b7ff8207c2e1817c6dc597a330810e8&format=jsonp', function(err,response, body) {
    // console.log(body); 
    if(err) return res.status(400).send(err);
    res.send(body);
  })
})

module.exports = router;

