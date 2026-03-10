// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicles');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API ComparAuto fonctionne 🚀' });
});

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/comparauto')
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});