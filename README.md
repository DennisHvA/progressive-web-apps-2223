# PWA

## Table Of Contents

-  Assignment
-  About
-  Features
-  Client side
-  Server side
-  Activity Diagram
-  Service worker
-  Critical render path

## Assignment

Zet de [client side webapplicatie](https://github.com/DennisHvA/web-app-from-scratch-2223) om in een server side rendered applicatie. Voeg ook functionaliteiten toe op basis van de Service Worker en maak van de applicatie een Progressive Web App. Ten slotte implementeer een reeks optimalisaties om de prestaties van de applicatie te verbeteren.

## App

In deze applicatie kan je zoeken naar de voedingswaarde van een product.

De gebruiker kan op 2 manieren producten zoeken en hier de waardes van zien:

- Barcode scanner

De gebruiker kan naar de scanner pagina gaan om de barcode te scannen. Hier wordt de camera aangezet en de barcode gelezen. Als de barcode is gelezen kijkt hij of de de barcode in de api zit en krijg je een detail pagina te zien.

- Zoekpagina 

De gebruiker kan naar de zoekpagina gaan om een product te zoeken op bijvoorbeeld de naam. Als de gebruiker op de zoekpagina komt zijn er standaard 12 producten te zien. De gebruiker kan de zoekfunctie gebruiken om naar andere producten te zoeken. Als de gebruiker meer wil weten over een van de getoonde producten kan hij hierop klikken en krijgt hij een detail pagina te zien. 

## Features

| Te doen                      | Klaar? |
| :--------------------------- | :---- |
| Expres routes                | ✅    |
| Search page                  | ✅    |
| Deatil page                  | ✅    |
| Client/server side scanner   | ✅    |
| Manifest                     | ✅    |
| Installable                  | ✅    |
| Caching                      | ✅    |
| Runtime cache                | ✅    |
| Errror/Offline page          | ✅    |
| Compression                  | ✅    |
| Font rendering controls      | ✅    |
| Minify CSS & JS              | ✅    |
| Cache header                 | ✅    |
| Deploy app                   | ✅    |
| Pagination                   |       |
| Recent/favorites             |       |

## Client side

Ik heb vrijwel alles naar server side overgezet, behalve de camara functie. Het scannen van de barcode gebeurd client side. Als er een barcode wordt gevonden dan laad hij de bijbehorende detail pagina. Als dit niet lukt laat hij een error pagina zien.

```js
const value = barcode.rawValue;
window.location.href = "details/" + value;
```

## Server side

Om door te gaan op de barcode scanner, als er een barcode wordt gevonden dan laad hij de bijbehorende detail pagina. Als dit niet lukt omdat de barcode niet in de api zit, dan wordt er krijg je een error pagina. Als javascript is uitgeschakeld kan de gebruiker een form gebruiken om de barcode in te vullen en naar de detailpagina te gaan.

```js
router.get("/zoek-barcode", (req, res) => {
  const barcode = req.query.barcode;
  res.redirect(`/details/${barcode}`);
});
```

Ook kan je naar een zoekpagina. Automatisch worden hier 12 resultaten getoond. Er wordt een fetch gedaan voor de eerste 12 resultaten in de api. De data geef ik mee aan de handlebars zoekpagina waarin ik zeg dat hij voor elk object een link moet maken waar de data uit het object in zit. Als de gebruiker de zoekbalk gebruikt wordt er gebruikt gemaakt van een search query om de api te fetchen met de search terms. Ook hier worden de eerste 12 resultaten getoond. 

```js
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
```

Ook hier kan de gebruiker naar een detail pagina gaan. De zoekresultaten heb ik een link meegegeven die bestaat uit de barcode. Als de gebruiker op het resultaat/link klikt fetcht hij de waarde van de link. Hij kijkt dus in feiten of de barcode in de api zit, en dat zit hij omdat hij ook in de zoekresultaten zit. Net als de zoekpagina geef ik voor de detail pagina data mee die ik in handlebars wil gaan gebruiken.

```js
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
```

## Activity Diagram

<img width="836" alt="Scherm­afbeelding 2023-04-06 om 01 31 36" src="https://user-images.githubusercontent.com/94405795/230235294-63a9759e-8ec2-462f-9622-3d11b81a2444.png">

## Service worker

Service Worker, een soort JavaScript worker die op de achtergrond van een webpagina draait en netwerkverzoeken kan onderscheppen, bronnen kan cachen en offline functionaliteit kan bieden.

In de serverworker doe ik meerdere dingen. Ik geef aan welke pagina's hij standaard moet opslaan in mijn cache en hij cached bestanden waar je op de site bent geweest. Zoals api data. Hij cached standaard de home pagina, de offline pagina en styles. Hiermee geef ik de gebruiker feedback dat de site niet bereikbaar is door zijn internet. Ook doe ik de homepagina omdat deze niet in eerste instantie wordt opgeslagen als je naar een andere pagina gaat. En natuurlijk cache ik de styling. 

```js
const CORE_CACHE_NAME = 'cache-v3';
const RUNTIME_CACHE_NAME = 'runtime-cache';
const CORE_ASSETS = [
  '/offline',
  '/styles/styles.css',
  '/',
  '/images/background.jpg',
  '/fonts/Montserrat-VariableFont_wght.ttf',
]
```

## Critical render path

### Before

<img width="427" alt="Scherm­afbeelding 2023-04-09 om 19 34 19" src="https://user-images.githubusercontent.com/94405795/230787738-b78b5bc6-c032-45c7-b54b-e59f5dffa285.png">

### Font swap

Ik heb een font gedownload en deze in CSS ingeladen. Hier zeg ik dat de content nog steeds geladen wordt als het font niet aanwezig is. Zo krijg je soms heel even een alternatief font te zien, maar dit zorgt er wel voor dat je niet hoeft te wachten tot je tekst ziet.

- [Font swap](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display/)

```css
@font-face {
    font-family: "Montserrat-FF";
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
    font-display: swap;
}
```

### GZIP

Ik heb een compressie gebruikt. Gzip comprimeren kan de grootte van de response body sterk verminderen en dus de snelheid van een web app verhogen.

```js
const compression = require('compression')
app.use(compression())
```

- [GZIP](https://www.npmjs.com/package/compression/)

### Gulp

Ik maak gebruik van een Gulpfile waar ik clean-css en uglify als tasks doe. Hiermee kan ik mijn public CSS en JS kleiner maken. Zo wordt de site sneller. Ik heb alle code in een andere map gezet, en de route naar waar het compressed moet worden naar de public map gedefineerd.

```js
gulp.task('cleanCSS', () => {
    return gulp.src('src/styles/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', gulp.series(['cleanCSS']))
```

### Cache Header

Ik heb in mijn app een cache header gebruikt zodat de cache na x aantal tijd weggaat. Dit doe ik omdat de API steeds kan veranderen en kan worden aangevuld. Anders blijft de cache voor altijd in je browser en wordt het niet geupdate. Ik heb de header op 7 dagen gezet, omdat ik denk dat dit een goede tijd is. Zo je bewaard hij een tijdje je cache en is het redelijk up tot date

```js
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=' + 7 * 24 * 60 * 60);
  next();
});
```

- [Gulp](https://gulpjs.com/)

### Revisioning

Verder heb ik nog kritisch naar mijn code gekeken om te kijken hoe ik dit kon verbeteren. Ik heb geprobeerd om alle kopjes aan te pakken. 

- Alle elementen hebben de juiste tags
- Zo min mogelijk div's, id's en classes te gebruiken 
- Meer CSS structuur en juiste selectoren
- Afbeeldingen hebben altteksten, een fallback image, hebben zoveel mogelijk een webbestandsnaam, zijn gecomprimeerd en hebben "lazy" loading
- Er zijn states toegevoegd en CSS states
- Overbodige, uitgecommente en console.logs zoveel mogelijk weggehaald
- De App heeft meer informatie meegekregen zoals een description. 

### Conclusion

### After

<img width="432" alt="Scherm­afbeelding 2023-04-09 om 19 35 16" src="https://user-images.githubusercontent.com/94405795/230787741-3ac7b25b-0f46-4228-9194-09511bf996a5.png">

Er zijn aardig wat resultaten aanwezig. Om een optimale performance te behalen wordt dit erg lastig omdat de API best traag is. Buiten dit is er niet veel wat gedaan zou kunnen worden om de performance te verbeteren en wat een groot effect zal hebben. 

## Deployment

Om mijn site maak ik gebruik van cyclic. Ik heb hiervoor gekozen omdat dit mij een makkelijke manier van deployen leek. Als je code naar Github pushed gaat hij overnieuw deployen.

[https://pwa-foodapi.cyclic.app](https://pwa-foodapi.cyclic.app)

## Installation

Installeer deze repository: 

```
Git clone https://github.com/dennishva/progressive-web-apps-2223
```

Om Node modules te installeren:

```
npm install
```

Om de applicatie te starten:

```
npm start
```

Om gebruik te maken van automatische updates tijdens development:

```
npm dev
```

Om client side veranderingen naar je public map te sturen:

```
gulp
```


## License

De [MIT](https://github.com/DennisHvA/progressive-web-apps-2223/blob/main/LICENSE) licentie wordt gebruikt
