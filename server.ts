import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './src/lib/db.ts';
import Tour from './src/models/Tour.ts';
import Inquiry from './src/models/Inquiry.ts';
import multer from 'multer';
import fs from 'fs';

const __dirname = path.resolve();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// async function startServer() {
//   await connectDB();
//   const app = express();
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data for when DB is not available
  const mockTours = [
    {
      _id: 'f1',
      title: 'Rafting',
      description: 'Experience the thrill of white water rafting on the Trisuli River. Perfect for beginners and experienced rafters alike, with exciting rapids and beautiful scenery.',
      duration: '1 Day',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1629248457649-b082812aea6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      visible: true,
      featured: true,
      price: 50
    },
    {
      _id: 'f2',
      title: 'Paragliding',
      description: 'Soar like a bird over Pokhara and Phewa Lake. Enjoy breathtaking views of the Annapurna range and Machhapuchhre while gliding through the Himalayan skies.',
      duration: '30-45 Mins',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1694811401930-8c827ce2342c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhcmFnbGlkaW5nfGVufDB8fDB8fHww'],
      visible: true,
      featured: true,
      price: 80
    },
    {
      _id: 'f3',
      title:  'Bungee',
      description: 'Take a leap of faith from a 160m high bridge over the Bhote Koshi River. One of the most spectacular bungee jumps in the world, surrounded by lush tropical gorges.',
      duration: '1 Day',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1559677624-3c956f10d431?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVuZ2VlJTIwanVtcGluZ3xlbnwwfHwwfHx8MA%3D%3D'],
      visible: true,
      featured: true,
      price: 120
    },
    {
      _id: 't1',
      title: 'Everest Base Camp (EBC)',
      description: 'This is the "bucket list" trek for most adventurers. Starting with a thrilling flight to Lukla, the trail winds through the heart of the Khumbu region. You’ll walk through famous Sherpa hubs like Namche Bazaar and visit the spiritual Tengboche Monastery. The journey culminates at the base of the world\'s highest peak, with a sunrise hike to Kala Patthar (5,545m) for the most iconic view of Everest.',
      duration: '14 Days',
      category: 'Trek',
      images: ['https://plus.unsplash.com/premium_photo-1697729996368-5b5c7843113e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlcmVzdCUyMGJhc2UlMjBjYW1wJTIwdHJla3xlbnwwfHwwfHx8MA%3D%3D'],
      visible: true,
      featured: true,
      price: 1500
    },
    {
      _id: 't2',
      title: 'Annapurna Circuit',
      description: 'Widely considered one of the most diverse treks in the world, this route takes you through a massive range of climates and landscapes. You begin in lush, subtropical valleys and climb into the high-altitude, Tibetan-style desert of Mustang. The highlight is crossing the Thorong La Pass at 5,416m, followed by a descent to the sacred temple of Muktinath.',
      duration: '18 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1720810828643-3b70f8e4cb2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5uYXB1cm5hJTIwY2lyY3VpdCUyMHRyZWt8ZW58MHx8MHx8fDA%3D'],
      visible: true,
      featured: true,
      price: 1200
    },
    {
      _id: 't3',
      title: 'Manaslu Circuit',
      description: 'If you want a high-altitude challenge without the massive crowds of Everest or Annapurna, Manaslu is the best choice. This "restricted area" trek circles the world\'s eighth-highest mountain. It offers a raw, authentic look at Tibetan-influenced culture and dramatic scenery, peaking with the crossing of the rugged Larkya La Pass (5,106m).',
      duration: '15 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1691516347496-f9ada8248715?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuYXNsdSUyMGNpcmN1aXQlMjB0cmVrfGVufDB8fDB8fHww'],
      visible: true,
      featured: true,
      price: 1300
    },
    {
      _id: 't4',
      title: 'Langtang Valley',
      description: 'Known as the "Valley of Glaciers," this trek is the most accessible from Kathmandu. It’s a shorter journey (usually 7–10 days) that offers incredible mountain panoramas without the need for a domestic flight. You’ll experience the unique culture of the Tamang people and can hike up to Kyanjin Ri for stunning views of Langtang Lirung and surrounding peaks.',
      duration: '8 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1643548947288-fbf86caf414a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZ3RhbmclMjB0cmVrfGVufDB8fDB8fHww'],
      visible: true,
      featured: true,
      price: 800
    },
    {
      _id: 't5',
      title: 'Mardi Himal',
      description: 'Mardi Himal is a rising star for those looking for a shorter, moderate trek with spectacular rewards. The trail follows a high ridge through rhododendron forests, keeping you "face-to-face" with the iconic Machhapuchhre (Fishtail Mountain). It is quieter than the nearby Annapurna Base Camp route and provides some of the best photography spots in the Himalayas.',
      duration: '6 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1571330422950-0de5787b593b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFyZGklMjBoaW1hbCUyMHRyZWt8ZW58MHx8MHx8fDA%3D'],
      visible: true,
      featured: true,
      price: 600
    }
  ];

  // API Routes
  
  // Tours API
  app.get('/api/tours', async (req, res) => {
    try {
      // const tours = await Tour.find({ visible: true });
      // res.json(tours);
      res.json(mockTours);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tours' });
    }
  });

  app.get('/api/admin/tours', async (req, res) => {
    try {
      // const tours = await Tour.find().sort({ createdAt: -1 });
      // res.json(tours);
      res.json(mockTours);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tours' });
    }
  });

  app.post('/api/admin/tours', upload.array('images'), async (req, res) => {
    try {
      const { title, description, price, duration, featured, visible, category } = req.body;
      const files = req.files as Express.Multer.File[];
      const images = files.map(file => `/uploads/${file.filename}`);
      
      const newTour = {
        _id: Date.now().toString(),
        title,
        description,
        price: Number(price),
        duration,
        featured: featured === 'true',
        visible: visible === 'true',
        category,
        images
      };
      
      // await newTour.save();
      res.status(201).json(newTour);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create tour' });
    }
  });

  app.put('/api/admin/tours/:id', async (req, res) => {
    try {
      // const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ ...req.body, _id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update tour' });
    }
  });

  app.delete('/api/admin/tours/:id', async (req, res) => {
    try {
      // await Tour.findByIdAndDelete(req.params.id);
      res.json({ message: 'Tour deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete tour' });
    }
  });

  // Inquiries API
  app.post('/api/inquiries', async (req, res) => {
    try {
      const { name, email, phone, message, tourId } = req.body;
      // const newInquiry = new Inquiry({ name, email, phone, message, tourId });
      // await newInquiry.save();
      res.status(201).json({ message: 'Inquiry sent successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to send inquiry' });
    }
  });

  app.get('/api/admin/inquiries', async (req, res) => {
    try {
      // const inquiries = await Inquiry.find().sort({ createdAt: -1 }).populate('tourId');
      res.json([]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
