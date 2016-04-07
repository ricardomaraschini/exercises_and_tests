var Hotel = require('./models/Hotel');

var Server = function() {

	this.port = 8080;
	this.bodyParser = require('body-parser');
	this.express = require('express');
	this.app = this.express();
	this.router = this.express.Router();

	this.run = function() {
		this.app.use(
			this.bodyParser.urlencoded({
				extended: true 
			})
		);
		this.app.use(
			this.bodyParser.json()
		);
		this.bindRoutes();
		this.app.listen(this.port);
		console.log('listening on ' + this.port);
	};

	this.bindRoutes = function() {
		this.router.get('/hotels', this.listHotels);
		this.router.post('/hotels', this.newHotel);
		this.router.get('/hotels/:hotelId', this.getHotelById);
		this.router.delete('/hotels/:hotelId', this.dropHotel);
		this.router.put('/hotels/:hotelId', this.updateHotel);
		this.app.use('/', this.router);
	};

	this.listHotels = function(req, res) {

		if (req.url != '/hotels') {
			url = require('url');
			url_parts = url.parse(req.url, true);
			Hotel.find({
				$or: [{
					name: {
						$regex: new RegExp('^.*' + url_parts.query.filter + '.*$', 'i')
					}
				},{
					address: {
						$regex: new RegExp('^.*' + url_parts.query.filter + '.*$', 'i')
					}
				}]
			}, function(err, hotels) {
				if (err)
					res.send(err);

				res.json(hotels);
			});
			return;
		}

		Hotel.find(function(err, hotels){
			if (err)
				res.send(err);
			res.json(hotels);
		});
	};

	this.newHotel = function(req, res) {
		var property;
		var hotel = new Hotel();

		for(property in Hotel.schema.paths) {
			if (/^_.+$/.test(property))
				continue;

			hotel[property] = req.body[property];
		}

		hotel.save(function(err) {
			if (err)
				res.send(err);

			res.json({success: true});

		});
	};

	this.getHotelById = function(req, res) {

		Hotel.findById(req.params.hotelId, function(err, hotel) {
			if (err)
				res.send(err);

			res.json(hotel);
		});		
	};

	this.dropHotel = function(req, res) {
		Hotel.remove({
			_id: req.params.hotelId	
		}, function(err, hotel) {
			if (err)
				res.send(err);

			res.json({success: true});
		});
	};

	this.updateHotel = function(req, res) {
		Hotel.findById(req.params.hotelId, function(err, hotel){
			var property;

			if (err)
				res.send(err);

			for(property in Hotel.schema.paths) {
				if (/^_.+$/.test(property))
					continue;

				hotel[property] = req.body[property];
			}

			hotel.save(function(err) {
				if (err) {
					res.send(err);
					return;
				}

				res.json({success: true});
			});
		});	
	};


};

module.exports = Server;
