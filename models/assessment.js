const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    parentTest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    },
    firstImpression: String,
    difficultyLevel: String,
    adequacy: String,
    potential: String,
    observations: String,
    conclusion: String
});

module.exports = mongoose.model('Assessment', assessmentSchema);