const express = require('express')
const app = express()
const { engine } = require('express-handlebars');
const port = 3000

app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const indexRouter = require('./router/index');
// const adminRouter = require('./router/admin');
app.use('/', indexRouter);
// app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 