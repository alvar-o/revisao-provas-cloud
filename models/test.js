const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
	code: String,
	description: String,
	level: String,
	subjects: Array,
	numQuestions: Number,
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Question'
		}
	],
	assessment: {
		firstImpression: String,
		difficultyLevel: String,
		adequacy: String,
		potential: String,
		observations: String,
		conclusion: String
	}	
});

module.exports = mongoose.model('Test', testSchema);