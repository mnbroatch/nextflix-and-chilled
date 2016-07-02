let mongoose = require('mongoose');


let movieSchema = new mongoose.Schema({
	title: {type: String, required:true},
	year: {type: Number, required:true}
});


let Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

