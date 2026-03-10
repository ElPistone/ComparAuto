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
    imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
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
    imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
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
  },
  {
    brand: 'Peugeot',
    model: '208',
    year: 2023,
    price: 19500,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500',
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
      rating: 4.2,
      reviewCount: 1800,
      commonIssues: ['Électronique', 'Embrayage']
    }
  },
  {
    brand: "Tesla",
    model: "Model 3 Performance",
    year: 2024,
    price: 55990,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
  general: {
    bodyType: "Berline",
    motorization: "Électrique",
    vehicleType: "Sportif",
    trunkCapacity: 649,
    hybridization: "Non",
    transmission: "Automatique"
  },
  performance: { "power": 510, "torque": 740, "acceleration": 3.1, "topSpeed": 262, "efficiency": 9.5 },
  economic: { "consumption": 16.5, "range": 528, "maintenanceCost": 200, "taxCost": 0, "insuranceCost": 1200 },
  expert: {
    battery: { "capacity": 79, "voltage": 400, "maxChargePower": 250, "cellType": "NMC", "cycleLife": 1500 },
    safety: { "euroCap": 5, "airbags": 8, "adas": ["Autopilot", "FSD"], "autonomyLevel": "2" }
  }
},
{
  brand: "Peugeot",
  model: "208 PureTech 100",
  year: 2023,
  price: 21000,
    imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
  general: {
    bodyType: "Citadine",
    motorization: "Thermique",
    vehicleType: "Urbain",
    trunkCapacity: 311,
    hybridization: "Non",
    transmission: "Manuelle"
  },
  performance: { "power": 100, "torque": 205, "acceleration": 9.9, "topSpeed": 188, "efficiency": 7.5 },
  economic: { "consumption": 5.4, "range": 800, "maintenanceCost": 400, "taxCost": 50, "insuranceCost": 600 }
},
{
  brand: "Porsche",
  model: "911 GT3 (992)",
  year: 2024,
  price: 195000,
  imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
  general: {
    bodyType: "Coupé",
    motorization: "Thermique",
    vehicleType: "Sportif",
    trunkCapacity: 132,
    hybridization: "Non",
    transmission: "Automatique"
  },
  performance: { "power": 510, "torque": 470, "acceleration": 3.4, "topSpeed": 318, "efficiency": 6.0 },
  expert: {
    engine: { "displacement": 3996, "injection": "Directe", "compression": 13.3, "distribution": "Chaîne", "turbo": false },
    chassis: { "torsionalRigidity": 35000, "weightDistribution": { "front": 40, "rear": 60 } }
  }
},
{
  brand: "Toyota",
  model: "RAV4 PHEV",
  year: 2023,
  price: 52000,
  imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
  general: {
    bodyType: "SUV",
    motorization: "Hybride",
    vehicleType: "Familial",
    trunkCapacity: 520,
    hybridization: "Rechargeable",
    transmission: "Automatique"
  },
  economic: { "consumption": 1.2, "range": 75, "maintenanceCost": 500, "taxCost": 0, "insuranceCost": 850 },
  expert: { "battery": { "capacity": 18.1, "maxChargePower": 6.6 } }
},
{
  brand: "Dacia",
  model: "Sandero Stepway",
  year: 2024,
  price: 16500,
  imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
  general: {
    bodyType: "Citadine",
    motorization: "Thermique",
    vehicleType: "Urbain",
    trunkCapacity: 328,
    hybridization: "Non",
    transmission: "Manuelle"
  },
  reliability: { "rating": 4.5, "reviewCount": 1200, "commonIssues": ["Plastiques intérieurs", "Bruit de vent"] }
},
{
  brand: "BMW",
  model: "iX xDrive50",
  year: 2024,
  price: 110000,
  imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
  general: {
    bodyType: "SUV",
    motorization: "Électrique",
    vehicleType: "Luxe",
    trunkCapacity: 500,
    hybridization: "Non",
    transmission: "Automatique"
  },
  expert: {
    safety: { "euroNcap": 5, "airbags": 9, "adas": ["Active Cruise Control", "Lane Keep"], "autonomyLevel": "3" }
  }
},
{
  brand: "Mercedes-Benz",
  model: "Classe S 580e",
  year: 2024,
  imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
  price: 135000,
  general: {
    bodyType: "Berline",
    motorization: "Hybride",
    vehicleType: "Luxe",
    trunkCapacity: 350,
    hybridization: "Rechargeable",
    transmission: "Automatique"
  },
  performance: { "power": 510, "torque": 750, "acceleration": 5.2, "topSpeed": 250, "efficiency": 8.5 }
},
{
  brand: "Volkswagen",
  model: "Golf 8 GTI",
  year: 2023,
  price: 45000,
  imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
  general: {
    bodyType: "Berline",
    motorization: "Thermique",
    vehicleType: "Sportif",
    trunkCapacity: 381,
    hybridization: "Non",
    transmission: "Automatique"
  },
  performance: { "power": 245, "torque": 370, "acceleration": 6.2, "topSpeed": 250, "efficiency": 7.0 }
},
{
  brand: "Renault",
  model: "Zoe R135",
  year: 2023,
  price: 34000,
  imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500',
  general: {
    bodyType: "Citadine",
    motorization: "Électrique",
    vehicleType: "Urbain",
    trunkCapacity: 338,
    hybridization: "Non",
    transmission: "Automatique"
  },
  economic: { "consumption": 17.2, "range": 390, "maintenanceCost": 150, "taxCost": 0, "insuranceCost": 450 }
},
{
  brand: "Audi",
  model: "RS6 Avant Performance",
  year: 2024,
  price: 147000,
  imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
  general: {
    bodyType: "Break",
    motorization: "Thermique",
    vehicleType: "Familial",
    trunkCapacity: 565,
    hybridization: "Léger",
    transmission: "Automatique"
  },
  performance: { "power": 630, "torque": 850, "acceleration": 3.4, "topSpeed": 280, "efficiency": 5.5 },
  expert: {
    engine: { "displacement": 3996, "injection": "Directe", "turbo": true },
    chassis: { "weightDistribution": { "front": 55, "rear": 45 } }
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
