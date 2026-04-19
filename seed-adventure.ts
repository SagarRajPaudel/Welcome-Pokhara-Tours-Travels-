import mongoose from 'mongoose';
import { connectDB } from './src/lib/db.ts';
import Tour from './src/models/Tour.ts';

const adventureTours = [
  {
    title: 'Trisuli River Rafting',
    description: 'Experience the thrill of white water rafting on the Trisuli River. Perfect for beginners and experienced rafters alike, with exciting rapids and beautiful scenery.',
    price: 60,
    duration: '1 Day',
    category: 'Adventure',
    featured: true,
    visible: true,
    images: ['https://images.unsplash.com/photo-1530866495547-08497ff13ee2?q=80&w=1000&auto=format&fit=crop']
  },
  {
    title: 'Sarankot Paragliding',
    description: 'Soar like a bird over Pokhara and Phewa Lake. Enjoy breathtaking views of the Annapurna range and Machhapuchhre while gliding through the Himalayan skies.',
    price: 85,
    duration: '30-45 Mins',
    category: 'Adventure',
    featured: true,
    visible: true,
    images: ['https://images.unsplash.com/photo-1596438459194-f275f413d6ff?q=80&w=1000&auto=format&fit=crop']
  },
  {
    title: 'The Last Resort Bungee',
    description: 'Take a leap of faith from a 160m high bridge over the Bhote Koshi River. One of the most spectacular bungee jumps in the world, surrounded by lush tropical gorges.',
    price: 110,
    duration: '1 Day',
    category: 'Adventure',
    featured: true,
    visible: true,
    images: ['https://images.unsplash.com/photo-1502126324834-38f8e02d7160?q=80&w=1000&auto=format&fit=crop']
  },
  {
    title: 'Ultra Light Flight',
    description: 'Get a unique perspective of the Himalayas with an Ultra Light flight. This open-cockpit aircraft offers unobstructed views of the mountains and Pokhara valley.',
    price: 150,
    duration: '15-60 Mins',
    category: 'Adventure',
    featured: true,
    visible: true,
    images: ['https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1000&auto=format&fit=crop']
  }
];

async function seedTours() {
  try {
    await connectDB();
    console.log('Connected to MongoDB for seeding...');
    
    for (const tourData of adventureTours) {
      const existing = await Tour.findOne({ title: tourData.title });
      if (!existing) {
        const tour = new Tour(tourData);
        await tour.save();
        console.log(`Added tour: ${tourData.title}`);
      } else {
        console.log(`Tour already exists: ${tourData.title}`);
      }
    }
    
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedTours();
