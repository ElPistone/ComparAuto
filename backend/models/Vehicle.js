// backend/models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  // Informations de base
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: '' },
  
  // Caractéristiques générales
  general: {
    bodyType: { type: String, enum: ['Berline', 'SUV', 'Break', 'Citadine', 'Coupé', 'Cabriolet'] },
    motorization: { type: String, enum: ['Thermique', 'Hybride', 'Électrique'] },
    vehicleType: { type: String, enum: ['Familial', 'Sportif', 'Urbain', 'Luxe'] },
    trunkCapacity: Number, // en litres
    hybridization: { type: String, enum: ['Léger', 'Rechargeable', 'Complet', 'Non'] },
    transmission: { type: String, enum: ['Manuelle', 'Automatique'] }
  },
  
  // Performance
  performance: {
    power: Number, // en chevaux
    torque: Number, // en Nm
    acceleration: Number, // 0-100 km/h en secondes
    topSpeed: Number, // km/h
    efficiency: Number // score composite sur 10
  },
  
  // Économique
  economic: {
    consumption: Number, // L/100km ou kWh/100km
    range: Number, // autonomie en km
    maintenanceCost: Number, // coût annuel moyen
    taxCost: Number, // fiscalité annuelle
    insuranceCost: Number // prime annuelle moyenne
  },
  
  // Équipements
  equipment: [{
    name: String,
    category: { type: String, enum: ['sécurité', 'confort', 'technologie'] },
    icon: String
  }],
  
  // Dimensions
  dimensions: {
    length: Number, // mm
    width: Number, // mm
    height: Number, // mm
    weight: Number // kg
  },
  
  // Garantie
  warranty: Number, // en années
  
  // Fiabilité
  reliability: {
    rating: Number, // note sur 5
    reviewCount: Number,
    commonIssues: [String]
  },
  
  // Pour le niveau EXPERT uniquement
  expert: {
    // Motorisation détaillée
    engine: {
      displacement: Number, // cm³
      injection: String,
      compression: Number,
      distribution: String,
      turbo: Boolean
    },
    // Châssis
    chassis: {
      torsionalRigidity: Number,
      suspensionGeometry: String,
      centerOfGravity: Number,
      weightDistribution: {
        front: Number,
        rear: Number
      }
    },
    // Batterie (pour électriques/hybrides)
    battery: {
      capacity: Number, // kWh
      voltage: Number,
      maxChargePower: Number,
      cellType: String,
      cycleLife: Number
    },
    // Sécurité avancée
    safety: {
      euroNcap: Number,
      airbags: Number,
      adas: [String],
      autonomyLevel: {
        type: String,
        enum: ['0', '1', '2', '3', '4', '5']
      }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);