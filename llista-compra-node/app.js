const express = require('express')
const app = express()
const port = 3000


// app.get('/', (req, res) => {
//  res.send('Hello World!')
// })
// app.get('/', (req, res) => {
//  res.send('<h1>BBB World!</h1>')
// })

// crear una API
app.get('/nom', (req, res) => {
 res.json({ nom: 'Patata' })
})


app.get('/hola/:nom/:cognoms', (req, res) => {
 const nom = req.params.nom
 const cognoms = req.params.cognoms


 var edat = req.query.edat
 if(!edat) {
   edat = "Desconeguda"
 }
 res.send(`<h1>Hola ${nom} ${cognoms} amb edat ${edat}!</h1>`)
})

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
 console.log(`Accedeix a http://localhost:${port} per veure l'aplicació`);
})

app.get('/calculadora/suma', (req, res) => {
  // Quan es numero query com la edat
  const numero1 = req.query.a
  const numero2 = req.query.b


  const suma = Number(numero1) + Number(numero2);

  res.send(`<h1>${numero1} + ${numero2} = ${suma}</h1>`)
})

app.post('/', (req, res) => {
 res.send('Got a POST request')
})

app.put('/user', (req, res) => {
 res.send('Got a PUT request at /user')
})


app.delete('/user', (req, res) => {
 res.send('Got a DELETE request at /user')
})




app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
 console.log(`Accedeix a http://localhost:${port} per veure l'aplicació`);
})