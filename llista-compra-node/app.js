const express = require('express')
const app = express()
const port = 3000

const exemplesRouter = require('./routes/exemples');
const calculadoraRouter = require('./routes/calculadora');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', exemplesRouter);
app.use('/calculadora', calculadoraRouter);

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
 console.log(`Accedeix a http://localhost:${port} per veure l'aplicació`);
})