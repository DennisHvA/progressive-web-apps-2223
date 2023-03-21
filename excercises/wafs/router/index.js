const express = require('express');
const request = require('request');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    res.render('home')
    fetch(`https://world.openfoodfacts.org/api/v0/product/5449000000996.json`)
    .then(async response => {
      const movieData = await response.json()
      console.log(movieData)
    })
})

router.get('/:id', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;