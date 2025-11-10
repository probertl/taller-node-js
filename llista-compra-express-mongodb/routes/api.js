const express = require('express');
const router = express.Router();
const Producte = require('../models/Producte');


// GET /api/productes - Obtenir tots els productes
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

// POST /api/productes - Crear un producte nou
router.post('/productes', async (req, res) => {
  try {

    const { nom, quantitat, unitat, categoria } = req.body;

    // Crear el nou producte segons l'esquema
    const nouProducte = await Producte.create({
      nom,
      quantitat,
      unitat,
      categoria
    });

    // Retornar resposta èxit
    res.json({
      success: true,
      message: 'Producte afegit correctament',
      producte: nouProducte
    });


  } catch (error) {
    console.error('Error API afegint producte:', error);

    // Si és un error de validació de Mongoose
    if (error.name === 'ValidationError') {
      const missatges = Object.values(error.errors).map(e => e.message);
      res.status(400).json({
        success: false,
        message: 'Error de validació',
        errors: missatges
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error del servidor'
      });
    }
  }
});


// GET /api/productes/:id - Obtenir un producte específic
router.get('/productes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    // Buscar el producte per ID
    const producte = await Producte.findById(id);

    if (!producte) {
      return res.status(404).json({
        success: false,
        message: 'No s\'ha trobat cap producte amb aquest ID'
      });
    }

    res.json({
      success: true,
      message: 'Producte obtingut correctament',
      producte
    });

  } catch (error) {
    console.error('Error obtenint producte:', error);

    if (error.name === 'CastError') {
      // Error quan l'ID no és vàlid
      res.status(400).json({
        success: false,
        message: 'ID de producte no vàlid'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  }
});





// PUT /api/productes/:id - Actualitzar producte completament
router.put('/productes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, quantitat, unitat, categoria, comprat } = req.body;

    const producteActualitzat = await Producte.findByIdAndUpdate(
      id,
      {
        nom,
        quantitat,
        unitat,
        categoria,
        comprat
      }
    );

    res.json({
        success: true,
        message: 'Producte actualitzat correctament'
      });
  } catch (error) {
    console.error('Error actualitzant producte:', error);

    if (error.name === 'CastError') {
      // Error quan l'ID no és vàlid
      res.status(400).json({
        success: false,
        message: 'ID de producte no vàlid'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  }
});

// PATCH /api/productes/:id - Actualitzar PARTS d'un producte
router.patch('/productes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualitzacions = req.body; // aquí agafem només els camps enviats

    const producteActualitzat = await Producte.findByIdAndUpdate(
      id,
      { $set: actualitzacions }, // actualitza només els camps que arriben
    );

    res.json({
      success: true,
      message: 'Producte actualitzat correctament',
    });

  } catch (error) {
    console.error('Error actualitzant PARTS de un producte:', error);

    if (error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'ID de producte no vàlid'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  }
});



// DELETE /api/productes/:id - Eliminar producte
router.delete('/productes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const producteEliminat = await Producte.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Producte eliminat correctament',
    });
  } catch (error) {
    console.error('Error eliminant producte:', error);

    if (error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'ID de producte no vàlid'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  }
});



module.exports = router;
