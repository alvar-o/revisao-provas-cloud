const db = require('../models')

exports.getTests = async function (req, res, next) {
    try {
        const tests = await db.Test.find({})
        res.render('index', { tests: tests})
    } catch (err) {
        next(err)
    }
}

exports.newTestPage = async function (req, res, next) {
    try {
        res.render('new-test');
    } catch (err) {
        next(err)
    }
}

exports.createTest = async function (req, res, next) {
    try {
        const test = await db.Test.create(req.body.test)
        
        const qs = [ ...Array(test.numQuestions).keys() ].map(i => ({
            parentTest: test._id,
            number: i+1
        }));
        const questions = await db.Question.create(qs)

        const populatedTest = await db.Test.findOneAndUpdate(
            { code: test.code },
            { $push: { 
                questions: { 
                    $each: questions
                    }
                }
            }
        )
        populatedTest.save()
        res.redirect(`/provas/${test.code}`)
    } catch (err) {
        next(err)
    }
}

exports.getTestByCode = async function (req, res, next) {
    try {
        const test = await db.Test
                        .findOne({ code: req.params.code })
                        .populate('questions')
        if (!!test) {
            res.render('test', {
                test: test,
                questions: test.questions
            })
        }
        else {
            res.redirect('/provas')
        }
    } catch (err) {
        next(err)
    }
}

exports.updateTest = async function (req, res, next) {
    try {
        // when editing the assessment, data received is the body
        // when editing test params, data received is body.test
        const data = req.body?.test ? req.body.test : req.body
        const updatedTest = await db.Test.findOneAndUpdate(
            { code: req.params.code },
            data,
            { new: true }
        )
        res.redirect(`/provas/${updatedTest.code}`)
    } catch (err) {
        next(err)
    }
}

exports.getTestStats = async function (req, res, next) {
    try {
        const test = await db.Test
                        .findOne({ code: req.params.code })
                        .populate('questions')
        res.render('stats', {
            test: test,
            questions: test.questions
         })
    } catch (err) {
        next(err)
    }
}

exports.printTest = async function (req, res, next) {
    try {
        const test = await db.Test
                        .findOne({ code: req.params.code })
                        .populate('questions')
        res.render('print', {
            test: test,
            questions: test.questions
         })
    } catch (err) {
        next(err)
    }
}
