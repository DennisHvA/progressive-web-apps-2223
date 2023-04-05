const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/details/:id', (req, res) => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${req.params.id}.json`)
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
    .catch((status) => res.render('error', {error:status}))
})

router.get('/search', (req, res) => {
  const searchPage = 1
  const searchTerm = req.query.search || 0
  fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=2&page=${searchPage}&page_size=10`)
      .then(async response => {
        const data = await response.json()

          res.render('search', {
              data: data.products,
          });
      })
});

router.get("/zoek-barcode", (req, res) => {
  const barcode = req.query.barcode;
  res.redirect(`/details/${barcode}`);
});

router.get("/scanner", (req, res) => {
  res.render("scanner")
} )

router.get('/offline', (req, res) => {
  res.render('offline');
});

router.use((req, res) => {
  res.status(404).render('error')
})

module.exports = router;