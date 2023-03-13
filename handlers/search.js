const db = require('../models')

exports.search = async function (req ,res, next) {
    const query = new RegExp(req.query.q, 'i')
    const questions = await db.Question
                .find({ subject: query })
                .populate({ path: 'parentTest' })
    res.render('search', {
        questions: questions,
        q: req.query.q
    })
}
