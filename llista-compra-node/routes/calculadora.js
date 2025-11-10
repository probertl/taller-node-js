const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('calculadora');
});


router.post('/', (req, res) => {
  //Aqui controlem quina operacio s'ha seleccionat per rederigir
  const operacio = req.body.operacio

  const numero1 = Number(req.body.num1);
  const numero2 = Number(req.body.num2);

  let resultat;

  switch (operacio) {
    case 'suma':
      resultat = Number(numero1) + Number(numero2);
      break;
    case 'resta':
      resultat = Number(numero1) - Number(numero2);
      break;
    case 'multiplicacio':
      resultat = Number(numero1) * Number(numero2);
      break;
    
    case 'divisio':
      resultat = Number(numero1) / Number(numero2);
      break;  
  
    }
    
    console.log(req.body)
    res.send(`El resultat de la ${operacio} es: ${resultat}`)

})

module.exports = router;