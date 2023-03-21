const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/:id', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;