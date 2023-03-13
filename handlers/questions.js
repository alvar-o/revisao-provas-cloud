const db = require('../models')

exports.getQuestion = async function (req, res, next) {
    try {
        const test = await db.Test.findOne({ code: req.params.code})
        const number = Number(req.params.question)
        const question = await db.Question.findOne({
            parentTest: test._id,
            number: number
        })
        res.render('question', {
            test: test,
            question: question
        })
    } catch (err) {
        next(err)
    }
}

exports.updateQuestion = async function (req, res, next) {
    try {
        const test = await db.Test.findOne({ code: req.params.code})
        const number = Number(req.params.question)
        const updatedQuestion = await db.Question.findOneAndUpdate({
                parentTest: test._id,
                number: number
            },
            req.body.question,
            { new: true }
            )
        res.redirect(`/provas/${test.code}`)
    } catch (err) {
        next(err)
    }
}
