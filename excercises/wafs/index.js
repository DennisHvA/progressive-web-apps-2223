const express = require('express')
const app = express()
const { engine } = require('express-handlebars');
const port = 3000

app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})