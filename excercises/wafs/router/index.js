const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    value = '5449000000996'
    fetch(`https://world.openfoodfacts.org/api/v0/product/${value}.json`)
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

router.get("/scanner", (req, res) => {
  res.render("scanner")
} )

module.exports = router;

// "https://nl.openfoodfacts.org/cgi/search.pl?search_terms=&json=true"
// `https://world.openfoodfacts.org/cgi/search.pl?search_terms=&search_simple=1&action=process&json=1`
// 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=$%7Breq.query.search%7D&search_simple=1&action=process&json=2&page=2

// router.get("/layout", async (req, res) => {
//   const response = await fetch(
//     `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${req.query.query}&search_simple=1&action=process&json=1`
//   );
//   const data = await response.json();
//   console.log(req.query.query)
//   res.render("layout", {
//     query: req.query.query,
//   });
// });

// router.get('/layout', async (req, res) => {
//   const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${req.query.search}&search_simple=1&action=process&json=1`);
//   const data = await response.json();

//           res.render('layout', {
//               data: data.products,
//           });
//       });