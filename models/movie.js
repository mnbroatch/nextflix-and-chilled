let mongoose = require('mongoose');
let request = require('request');


let movieSchema = new mongoose.Schema({
	title: {type: String, required:true},
	year: Number,
	netflix: Number,
	imdb: String,
	poster: String,
	imdbRating: String,
	metascore: String,
	plot: String,
	actors: String,
	runtime: Number
});


movieSchema.methods.getInfoAndSave = function(cb){
	return request
	.get('http://www.omdbapi.com/?t=' + encodeURIComponent(this.title) + '&y=' + this.year, (error,response,body) => {
		body = JSON.parse(body);
		if (body.Response !== "False"){
			this.imdb = body.imdbID;
			this.imdbRating = body.imdbRating;
			this.metascore = body.Metascore;
			this.plot = body.Plot;
			this.actors = body.Actors;
			this.runtime = parseInt(body.Runtime.slice(0,-4));

			// TODO: remove api key
			request.get("https://api.themoviedb.org/3/find/"+ this.imdb + "?external_source=imdb_id&api_key=d30a3154577a074b866f6a5123696362", (error,response,body) => {
				body = JSON.parse(body);
				this.poster = "https://image.tmdb.org/t/p/original" + body.movie_results[0].poster_path;
				this.save(cb);
			})
		}
		else cb("No movie bitch");
	})
}

movieSchema.statics.getRandom = function(cb){
	this.count((err, count)  => {
		if (err) {
			return cb(err);
		}
		var rand = Math.floor(Math.random() * count);
		this.findOne().skip(rand).exec(cb);
	});
};

let Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;



