var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hotels');

var HotelSchema = new mongoose.Schema({
	name: String,
	address: String,
	starRating: Number,
	accomodationType: String
});

module.exports = mongoose.model('Hotel', HotelSchema);
