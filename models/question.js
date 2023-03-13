const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	parentTest: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test'
	},
	number: Number,
	time: String,
	diffLevel: String,
	subject: Array,
	answer: String,
	solution: String,
	analysis: String
});

module.exports = mongoose.model('Question', questionSchema);