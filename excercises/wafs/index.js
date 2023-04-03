const express = require('express')
const app = express()
const { engine } = require('express-handlebars');
const port = 2000

const compression = require('compression')
app.use(compression())

app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const indexRouter = require('./router/index');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 