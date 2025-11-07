const express = require('express');
const router = express.Router();
const Producte = require('../models/Producte');


// GET /api/productes - Obtenir tots els productes

// POST /api/productes - Crear un producte nou
router.get('/productes', async (req, res) => {
  try {
    const { comprat } = req.query;
    let filter = {};
   
    // Filtrar per productes comprats o no comprats si s'especifica
    if (comprat !== undefined) {
      filter.comprat = comprat === 'true';
    }
   
    const productes = await Producte.find(filter).sort({ dataCreacio: -1 });
   
    res.json({
      success: true,
      count: productes.length,
      data: productes
    });
   
  } catch (error) {
    console.error('Error obtenint productes:', error);
    res.status(500).json({
      success: false,
      message: 'Error obtenint productes'
    });
  }
});

// GET /api/productes/:id - Obtenir un producte específic
router.get('/productes/:id', async (req, res) => {
    // TODO
});




// PUT /api/productes/:id - Actualitzar producte completament
router.put('/productes/:id', async (req, res) => {
  // TODO
});


// DELETE /api/productes/:id - Eliminar producte
router.delete('/productes/:id', async (req, res) => {
  // TODO
});


module.exports = router;
