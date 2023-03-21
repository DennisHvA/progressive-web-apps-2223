const express = require('express');
const request = require('request');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/5449000000996.json`)
    .then(async response => {
      const data = await response.json()

      console.log(data)
      res.render('home', {
        link: data.code,
        name: data.product.product_name,
        image: data.product.image_front_url,
        cal: data.product.nutriments['energy-kcal_100g']
      })
    })
})

router.get('/:id', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;