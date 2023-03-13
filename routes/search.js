const db = require('../models')

const express = require('express'),
      router = express(),
      { requiresAuth } = require('express-openid-connect')

function diacriticSensitiveRegex(string) {
    let spread = string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/a/g, '[a,á,à,ã,â]')
        .replace(/e/g, '[e,é,è,ê]')
        .replace(/i/g, '[i,í,î,ì]')
        .replace(/o/g, '[o,ó,ö,ò,ô]')
        .replace(/u/g, '[u,ü,ú,ù]')
    return new RegExp(spread, 'i')
}

router.get('/', requiresAuth(), async function (req ,res, next) {
    try {
        const query = diacriticSensitiveRegex(req.query.q)
        const questions = await db.Question
                    .find({ subject: query })
                    .populate({ path: 'parentTest' })
        res.render('search', {
            questions: questions,
            q: req.query.q
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router