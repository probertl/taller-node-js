const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuració de middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configuració del motor de plantilles
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Estructura de dades
let llistaCompra = [];

// Routes
app.get('/', (req, res) => {
  const missatge = req.query.missatge;
  const error = req.query.error;
  
  res.render('index', { 
    llistaCompra, 
    missatge, 
    error 
  });
});

app.post('/afegir', (req, res) => {
  const nouItem = req.body.item?.trim();
  
  if (nouItem) {
    llistaCompra.push(nouItem);
    console.log(`Element afegit: ${nouItem}`);
    res.redirect('/?missatge=Element afegit correctament');
  } else {
    res.redirect('/?error=No s\'ha pogut afegir l\'element');
  }
});

app.post('/eliminar', (req, res) => {
  const index = parseInt(req.body.index);
  
  if (!isNaN(index) && index >= 0 && index < llistaCompra.length) {
    const elementEliminat = llistaCompra.splice(index, 1)[0];
    console.log(`Element eliminat: ${elementEliminat}`);
    res.redirect('/?missatge=Element eliminat correctament');
  } else {
    res.redirect('/?error=Index no vàlid');
  }
});

app.post('/netejar', (req, res) => {
  llistaCompra = [];
  console.log('Llista netejada');
  res.redirect('/?missatge=Llista neteja correctament');
});

// API endpoints
app.get('/api/llista', (req, res) => {
  res.json(llistaCompra);
});

app.post('/api/llista', (req, res) => {
  const nouItem = req.body.item?.trim();
  
  if (nouItem) {
    llistaCompra.push(nouItem);
    res.json({ 
      success: true, 
      message: 'Element afegit correctament',
      item: nouItem 
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Item no vàlid' 
    });
  }
});

app.delete('/api/llista/:index', (req, res) => {
  const index = parseInt(req.params.index);
  
  if (!isNaN(index) && index >= 0 && index < llistaCompra.length) {
    const elementEliminat = llistaCompra.splice(index, 1)[0];
    res.json({ 
      success: true, 
      message: 'Element eliminat correctament',
      item: elementEliminat 
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Index no vàlid' 
    });
  }
});

// Error 404
app.use((req, res) => {
  res.status(404).render('error', { 
    missatge: 'Pàgina no trobada' 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escoltant al port ${PORT}`);
  console.log(`Accedeix a http://localhost:${PORT} per veure l'aplicació`);
});