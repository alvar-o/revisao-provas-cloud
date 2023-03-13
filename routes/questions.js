const express = require('express'),
      router = express()
const { getQuestion, updateQuestion } = require('../handlers/questions');


router.get('/provas/:code/:question', getQuestion)
router.put('/provas/:code/:question', updateQuestion)

module.exports = router