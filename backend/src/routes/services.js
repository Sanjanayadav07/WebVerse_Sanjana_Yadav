const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// ✅ Seed Route (FIRST)
router.get('/seed', async (req, res) => {
  if (req.query.key !== "admin123") {
    return res.status(403).json({ msg: "Unauthorized" });
  }

 const sampleServices = [
  {
    name: 'Plumber',
    category: 'Plumber',
    description: 'Fix leaks',
    price: 250,
    image: '/images/plumber.jpg'
  },
  {
    name: 'Electrician',
    category: 'Electrician',
    description: 'Wiring work',
    price: 300,
    image: '/images/electrician.jpg'
  },
  {
    name: 'Math Tutor',
    category: 'Tutor',
    description: 'Math classes',
    price: 400,
    image: '/images/tutor.jpg'
  },
  {
    name: 'Cleaning',
    category: 'Cleaner',
    description: 'Home cleaning',
    price: 200,
    image: '/images/cleaner.jpg'
  },
  {
    name: 'Carpenter',
    category: 'Carpenter',
    description: 'Furniture work',
    price: 350,
    image: '/images/carpenter.webp'
  }
];

  try {
    await Service.deleteMany({});
    await Service.insertMany(sampleServices);
    res.json({ msg: 'Services seeded successfully!' });
  } catch(err){
    console.error("SEED ERROR:", err); 
    res.status(500).json({ msg: 'Error seeding services' });
  }
});

// ✅ Get all services (with filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const services = await Service.find(filter)
      .populate('provider', 'name');

    res.json(services);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'name');

    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    res.json(service);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;