const express = require('express'),
      router = express(),
      { requiresAuth } = require('express-openid-connect'),
      { 
        getTests, 
        newTestPage, 
        createTest, 
        getTestByCode,
        updateTest, 
        getTestStats, 
        printTest 
      } = require('../handlers/tests'),
      { 
        getQuestion,
        updateQuestion
      } = require('../handlers/questions');



router.get('/', requiresAuth(), getTests)
router.get('/new', requiresAuth(), newTestPage)
router.post('/', requiresAuth(), createTest)

router.get('/:code', requiresAuth(), getTestByCode)
router.put('/:code', requiresAuth(), updateTest)
router.get('/:code/stats', requiresAuth(), getTestStats)
router.get('/:code/print', requiresAuth(), printTest)

router.get('/:code/:question', requiresAuth(), getQuestion)
router.put('/:code/:question', requiresAuth(), updateQuestion)



module.exports = router;