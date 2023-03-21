const express = require('express');
const request = require('request');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/5449000000996.json`)
    .then(async response => {
      const data = await response.json()

      res.render('home', {
        link: data.code,
        name: data.product.product_name,
        image: data.product.image_front_url,
        cal: data.product.nutriments['energy-kcal_100g']
      })
    })
})

router.get('/:id', (req, res) => {
//   res.send('Hello World!')
    fetch(`https://world.openfoodfacts.org/api/v0/product/5449000000996.json`)
    .then(async response => {
    const data = await response.json()

    res.render('details', {
        name: data.product.product_name,
        image: data.product.image_front_url,
        calories: data.product.nutriments['energy-kcal_100g'],
        caffeine: data.product.nutriments['caffeine_100g'],
        carbohydrates: data.product.nutriments['carbohydrates_100g'],
        fat: data.product.nutriments['fat_100g'],
        fibers: data.product.nutriments['fiber_100g'],
        proteins: data.product.nutriments['proteins_100g'],
        salts: data.product.nutriments['salt_100g'],
        sugars: data.product.nutriments['sugars_100g']
    })
    })
})

module.exports = router;