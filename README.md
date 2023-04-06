# PWA

## Table Of Contents

-  About
-  Functions
-  Client side
-  Server side
-  Activity Diagram
-  Service worker
-  Critical render path

## About

In deze applicatie kan je zoeken naar de voedingswaarde van een product.

De gebruiker kan op 2 manieren producten zoeken en hier de waardes van zien:

- Barcode scanner

De gebruiker kan naar de scanner pagina gaan om de barcode te scannen. Hier wordt client side de camera aangezet en de barcode gelezen. Als de barcode is gelezen fetcht hij de barcode uit de api en krijg je een detail pagina te zien.

- Zoekpagina 

De gebruiker kan naar de zoekpagina gaan om een product te zoeken op bijvoorbeeld de naam. Als de gebruiker op de zoekpagina komt zijn er standaard 10 producten te zien. De gebruiker kan de zoekfunctie gebruiken om naar andere producten te zoeken. Als de gebruiker meer wil weten over een van de getoonde producten kan hij hierop klikken en krijgt hij een detail pagina te zien. 

## Functions

| Te doen                      | Klaar? |
| :--------------------------- | :---- |
| Expres routes                | ✅    |
| Search page                  | ✅    |
| Minimize client side scanner | ✅    |
| Manifest                     | ✅    |
| Caching                      | ✅    |
| Errror/Offline page          | ✅    |
| Enhancements                 | ✅    |
| Update cache                 |       |
| Styling                      |       |

## Client side

Ik heb vrijwel alles naar server side overgezet, behalve de camara functie. Het scannen van de barcode gebeurd client side. Als er een barcode wordt gevonden dan laad hij de bijbehorende detail pagina. Als dit niet lukt 

## Server side

Om door de gaan op de barcode scanner, als er een barcode wordt gevonden dan laad hij de bijbehorende detail pagina. Als dit niet lukt omdat de barcode niet in de api zit, dan wordt er krijg je een error pagina.

Ook kan je naar een zoekpagina. Automatisch worden hier 10 resultaten getoond. Er wordt een fetch gedaan voor de eerste 10 resultaten in de api. De data geef ik mee aan de handlebars zoekpagina waarin ik zeg dat hij voor elk object een link moet maken waar de data uit het object in zit. Als de gebruiker de zoekbalk gebruikt wordt er gebruikt gemaakt van een search query om de api te fetchen met de search terms. Ook hier worden de eerste 10 resultaten getoond. 

Ook hier kan de gebruiker naar een detail pagina gaan. De zoekresultaten heb ik een link meegegeven die bestaat uit de barcode. Als de gebruiker op het resultaat/link klikt fetcht hij de waarde van de link. Hij kijkt dus in feiten of de barcode in de api zit, en dat zit hij omdat hij ook in de zoekresultaten zit. Net als de zoekpagina geef ik voor de detail pagina data mee die ik in handlebars wil gaan gebruiken.

## Activity Diagram

<img width="836" alt="Scherm­afbeelding 2023-04-06 om 01 31 36" src="https://user-images.githubusercontent.com/94405795/230235294-63a9759e-8ec2-462f-9622-3d11b81a2444.png">

## Service worker

Service Worker, een soort JavaScript worker die op de achtergrond van een webpagina draait en netwerkverzoeken kan onderscheppen, bronnen kan cachen en offline functionaliteit kan bieden.

In de serverworker doe ik meerdere dingen. Ik geef aan welke pagina's ik standaard wil opslaan in mijn cache en ik cache bestanden waar ik op de site ben geweest. Zoals api data. Ik cache standaard de home pagina, de offline pagina en styles. Hiermee geef ik de gebruiker feedback dat de site niet gereikbaar is door zijn internet. Ook doe ik de homepagina omdat deze niet in eerste instantie wordt opgeslagen als je naar een andere pagina gaat. En natuurlijk cache ik de styling. 

## Critical render path

### Font swap

Ik heb een font gedownload en deze in CSS ingeladen. Hier zeg ik dat de content nog steeds geladen wordt als het font niet aanwezig is. Zo krijg je soms heel even een alternatief font te zien, maar dit zorgt er wel voor dat je niet hoeft te wachten tot je tekst ziet.

- [Font swap](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display/)

### GZIP

Ik heb een compressie gebruikt. Gzip comprimeren kan de grootte van de response body sterk verminderen en dus de snelheid van een web app verhogen.

- [GZIP](https://www.npmjs.com/package/compression/)

### Gulp

Ik maak gebruik van een Gulpfile waar ik clean-css en uglify als tasks doe. Hiermee kan ik mijn public CSS en JS kleiner maken. Zo wordt de site sneller. Ik heb alle code in een andere map gezet, en de route naar waar het compressed moet worden naar de public map gedefineerd.

- [Gulp](https://gulpjs.com/)

## Conclusie

<img width="518" alt="Scherm­afbeelding 2023-04-06 om 01 38 30" src="https://user-images.githubusercontent.com/94405795/230236576-009f3d91-9461-43b9-be50-5c48bc4250de.png">

Het is erg lastig om grote veranderingen aan te brengen. Elke keer als je een scan uitvoert krijg je een ander resultaat. Naar mijn idee komt dit vooral doordat de api erg traag is. Maar dingen zoals styles, fonts, javascript gaat hij nu beter mee om!

## Deployment
Om mijn site maak ik gebruik van render.com. Ik heb hiervoor gekozen omdat dit mij een makkelijke manier van deployen leek. Als je code naar Github pushed gaat hij overnieuw deployen.

[https://test-5nr9.onrender.com](https://test-5nr9.onrender.com)

## Installation

Installeer deze repository: 

```
Git clone https://github.com/dennishva/browser-technologies-2223
```

Om Node modules te installeren:

```
npm install
```

Om de applicatie te starten:

```
npm start
```

Om client side veranderingen naar je public map te sturen:

```
gulp
```
