const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, err => {
		if (err) throw err;
		console.log('Connected to MongoDB.')
	});

module.exports.Test = require('./test')
module.exports.Question = require('./question')