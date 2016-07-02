"use strict;"


let express = require('express');
let Movie = require('../models/movie');

let router = express.Router();


router.route('/')
.get(function(req,res){
	Movie.find({}, (err,movies) => {
		res.status(err? 400:200).send(err || movies);
	});
})

.post(function(req,res){
	let movie = new Movie(req.body);
	movie.getInfoAndSave((err,savedMovie)=>{
		res.status(err? 400:200).send(err || savedMovie);
	});
});


router.route('/:id')
.get(function(req,res){
	Movie.find({_id:req.params.id}, (err,movie) => {
		res.status((err || !movie)? 400:200).send(err || movie[0]);
	});
})
.put(function(req,res){
	Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedMovie) => {
		res.status(err? 400:200).send(err || savedMovie);
	});
})
.delete(function(req,res){
	Movie.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});


module.exports = router;

