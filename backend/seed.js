// backend/seed.js
const mongoose = require('mongoose');
require('dotenv').config();
const Vehicle = require('./models/Vehicle');

const vehicles = [
  {
    brand: 'Tesla',
    model: 'Model Y',
    year: 2024,
    price: 44990,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500',
    general: {
      bodyType: 'SUV',
      motorization: 'Électrique',
      vehicleType: 'Familial',
      trunkCapacity: 854,
      hybridization: 'Non',
      transmission: 'Automatique'
    },
    performance: {
      power: 384,
      torque: 493,
      acceleration: 3.5,
      topSpeed: 250,
      efficiency: 9.2
    },
    economic: {
      consumption: 16.5,
      range: 533,
      maintenanceCost: 300,
      taxCost: 0,
      insuranceCost: 1200
    },
    equipment: [
      { name: 'Toit panoramique', category: 'confort', icon: 'car-sunroof' },
      { name: 'Caméra de recul', category: 'sécurité', icon: 'camera' },
      { name: 'Régulateur adaptatif', category: 'technologie', icon: 'cruise-control' }
    ],
    dimensions: {
      length: 4751,
      width: 1921,
      height: 1624,
      weight: 2003
    },
    warranty: 4,
    reliability: {
      rating: 4.2,
      reviewCount: 1250,
      commonIssues: ['Finition', 'Service client']
    }
  },
  {
    brand: 'Renault',
    model: 'Clio V',
    year: 2023,
    price: 21500,
    imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
    general: {
      bodyType: 'Citadine',
      motorization: 'Thermique',
      vehicleType: 'Urbain',
      trunkCapacity: 391,
      hybridization: 'Non',
      transmission: 'Manuelle'
    },
    performance: {
      power: 130,
      torque: 240,
      acceleration: 9.0,
      topSpeed: 210,
      efficiency: 7.8
    },
    economic: {
      consumption: 5.2,
      range: 800,
      maintenanceCost: 400,
      taxCost: 150,
      insuranceCost: 600
    },
    equipment: [
      { name: 'Climatisation auto', category: 'confort', icon: 'air-conditioner' },
      { name: 'Écran tactile', category: 'technologie', icon: 'touchscreen' }
    ],
    dimensions: {
      length: 4050,
      width: 1798,
      height: 1440,
      weight: 1180
    },
    warranty: 3,
    reliability: {
      rating: 4.5,
      reviewCount: 3450,
      commonIssues: ['Électronique', 'Embrayage']
    }
  },
  {
    brand: 'BMW',
    model: 'Série 3',
    year: 2024,
    price: 45900,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
    general: {
      bodyType: 'Berline',
      motorization: 'Hybride',
      vehicleType: 'Familial',
      trunkCapacity: 480,
      hybridization: 'Rechargeable',
      transmission: 'Automatique'
    },
    performance: {
      power: 292,
      torque: 420,
      acceleration: 5.9,
      topSpeed: 240,
      efficiency: 8.5
    },
    economic: {
      consumption: 2.1,
      range: 600,
      maintenanceCost: 600,
      taxCost: 200,
      insuranceCost: 900
    },
    equipment: [
      { name: 'Toit ouvrant', category: 'confort', icon: 'car-sunroof' },
      { name: 'Sièges chauffants', category: 'confort', icon: 'heated-seats' },
      { name: 'ADAS complet', category: 'sécurité', icon: 'safety' }
    ],
    dimensions: {
      length: 4709,
      width: 1827,
      height: 1442,
      weight: 1650
    },
    warranty: 3,
    reliability: {
      rating: 4.3,
      reviewCount: 2100,
      commonIssues: ['Électronique', 'Suspension']
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/comparauto');
    console.log('✅ Connecté à MongoDB');
    
    await Vehicle.deleteMany({});
    console.log('🗑️ Anciennes données supprimées');
    
    await Vehicle.insertMany(vehicles);
    console.log('✅ 3 véhicules ajoutés avec succès');
    
    mongoose.disconnect();
    console.log('👋 Déconnexion');
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
};

seedDatabase();