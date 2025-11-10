require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const productsRoutes = require('./src/routes/products');
const usersRoutes = require('./src/routes/users');

const app = express();

// 🔧 Configuració bàsica
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const MONGODB_URI="mongodb+srv://patri:patri@cluster0.pdbng6o.mongodb.net/proves?appName=Cluster0"; 
console.log("La uri de mongodb és " + MONGODB_URI);
// ⚙️ Configuració d'entorn0
const PORT = process.env.PORT || 3000;
const MONGO_URI = MONGODB_URI || 'mongodb://localhost:27017/librarydb';
const API_PREFIX = process.env.API_PREFIX || '/api';

// 🌐 Rutes principals amb prefix
app.use(`${API_PREFIX}/products`, productsRoutes);
app.use(`${API_PREFIX}/users`, usersRoutes);

// 🧠 Ruta informativa de la API
app.get(API_PREFIX, (req, res) => {
  res.json({
    name: 'Library API',
    version: '1.0.0',
    message: 'Benvingut a la API pública del projecte Products',
    endpoints: {
      books: `${API_PREFIX}/products`,
      users: `${API_PREFIX}/users`
    }
  });
});

// 🚫 Gestió d’errors
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no trobada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  }
});


// 🧩 Connexió a MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connectat')
  // 🚀 Inicialització del servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor actiu al port ${PORT}`);
    console.log(`🌐 API disponible a http://localhost:${PORT}${API_PREFIX}`);
  });
})
.catch((err) => {
  console.error('❌ Error de connexió a MongoDB:', err.message);
  process.exit(1);
});