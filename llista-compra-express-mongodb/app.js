require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Importar el model
const Producte = require('./models/Producte');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configuració EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexió a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connectat a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error connectant a MongoDB:', error);
    process.exit(1);
  }
}

// Middleware per injectar la connexió a les rutes
app.use(async (req, res, next) => {
  req.db = mongoose.connection;
  next();
});

const apiRoutes = require('./routes/api');
// Muntar rutes API
app.use('/api', apiRoutes);



// Rutes
app.get('/', async (req, res) => {
  try {
    // Obtenir tots els productes no comprats
    const productes = await Producte.find({ comprat: false })
      .sort({ dataCreacio: -1 });
    
    const missatge = req.query.missatge;
    const error = req.query.error;
    
    res.render('index', {
      productes,
      missatge,
      error,
      categories: ['fruites i verdures', 'carn i peix', 'làctics', 'begudes', 'asseo', 'altres']
    });
    
  } catch (error) {
    console.error('Error obtenint productes:', error);
    res.redirect('/?error=Error carregant la llista');
  }
});

// Ruta per afegir producte (IMPLEMENTACIÓ SOL·LICITADA)
app.post('/afegir', async (req, res) => {
  try {
    const { nom, quantitat, unitat, categoria } = req.body;
    
    // Crear nou producte amb les dades del formulari
    const nouProducte = new Producte({
      nom: nom.trim(),
      quantitat: parseInt(quantitat) || 1,
      unitat: unitat || 'unitats',
      categoria: categoria || 'altres'
    });
    
    // Guardar a la base de dades
    await nouProducte.save();
    
    console.log(`✅ Producte afegit: ${nouProducte.nom}`);
    res.redirect('/?missatge=Producte afegit correctament');
    
  } catch (error) {
    console.error('❌ Error afegint producte:', error);
    
    // Gestió d'errors de validació de Mongoose
    if (error.name === 'ValidationError') {
      const missatges = Object.values(error.errors).map(err => err.message);
      res.redirect(`/?error=${encodeURIComponent(missatges.join(', '))}`);
    } else {
      res.redirect('/?error=Error afegint el producte');
    }
  }
});

// Ruta API per afegir producte (JSON)
app.post('/api/productes', async (req, res) => {
  try {
    const { nom, quantitat, unitat, categoria } = req.body;
    
    const nouProducte = new Producte({
      nom: nom?.trim(),
      quantitat: parseInt(quantitat) || 1,
      unitat: unitat || 'unitats',
      categoria: categoria || 'altres'
    });
    
    await nouProducte.save();
    
    res.json({
      success: true,
      message: 'Producte afegit correctament',
      producte: nouProducte
    });
    
  } catch (error) {
    console.error('Error API afegint producte:', error);
    
    if (error.name === 'ValidationError') {
      const missatges = Object.values(error.errors).map(err => err.message);
      res.status(400).json({
        success: false,
        message: missatges.join(', ')
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  }
});

// Iniciar servidor
async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corrent a http://localhost:${PORT}`);
    console.log(`📊 Base de dades: ${mongoose.connection.host}`);
    console.log(`🗃️  Database: ${mongoose.connection.name}`);
  });
}

startServer().catch(console.error);