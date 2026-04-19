import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TourCard from '@/components/TourCard';

export default function Tours() {
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fallbackTours = [
    {
      _id: 'f1',
      title: 'Trisuli River Rafting',
      description: 'Experience the thrill of white water rafting on the Trisuli River. Perfect for beginners and experienced rafters alike, with exciting rapids and beautiful scenery.',
      duration: '1 Day',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1596438459194-f275f413d6ff?q=80&w=1000&auto=format&fit=crop']
    },
    {
      _id: 'f2',
      title: 'Sarankot Paragliding',
      description: 'Soar like a bird over Pokhara and Phewa Lake. Enjoy breathtaking views of the Annapurna range and Machhapuchhre while gliding through the Himalayan skies.',
      duration: '30-45 Mins',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1596438459194-f275f413d6ff?q=80&w=1000&auto=format&fit=crop']
    },
    {
      _id: 'f3',
      title: 'The Last Resort Bungee',
      description: 'Take a leap of faith from a 160m high bridge over the Bhote Koshi River. One of the most spectacular bungee jumps in the world, surrounded by lush tropical gorges.',
      duration: '1 Day',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1502126324834-38f8e02d7160?q=80&w=1000&auto=format&fit=crop']
    },
    {
      _id: 'f4',
      title: 'Ultra Light Flight',
      description: 'Get a unique perspective of the Himalayas with an Ultra Light flight. This open-cockpit aircraft offers unobstructed views of the mountains and Pokhara valley.',
      duration: '15-60 Mins',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1000&auto=format&fit=crop']
    },
    {
      _id: 't1',
      title: 'Everest Base Camp (EBC)',
      description: 'This is the "bucket list" trek for most adventurers. Starting with a thrilling flight to Lukla, the trail winds through the heart of the Khumbu region. You’ll walk through famous Sherpa hubs like Namche Bazaar and visit the spiritual Tengboche Monastery. The journey culminates at the base of the world\'s highest peak, with a sunrise hike to Kala Patthar (5,545m) for the most iconic view of Everest.',
      duration: '14 Days',
      category: 'Trek',
      images: ['https://plus.unsplash.com/premium_photo-1697729996368-5b5c7843113e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlcmVzdCUyMGJhc2UlMjBjYW1wJTIwdHJla3xlbnwwfHwwfHx8MA%3D%3D']
    },
    {
      _id: 't2',
      title: 'Annapurna Circuit',
      description: 'Widely considered one of the most diverse treks in the world, this route takes you through a massive range of climates and landscapes. You begin in lush, subtropical valleys and climb into the high-altitude, Tibetan-style desert of Mustang. The highlight is crossing the Thorong La Pass at 5,416m, followed by a descent to the sacred temple of Muktinath.',
      duration: '18 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1720810828643-3b70f8e4cb2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5uYXB1cm5hJTIwY2lyY3VpdCUyMHRyZWt8ZW58MHx8MHx8fDA%3D']
    },
    {
      _id: 't3',
      title: 'Manaslu Circuit',
      description: 'If you want a high-altitude challenge without the massive crowds of Everest or Annapurna, Manaslu is the best choice. This "restricted area" trek circles the world\'s eighth-highest mountain. It offers a raw, authentic look at Tibetan-influenced culture and dramatic scenery, peaking with the crossing of the rugged Larkya La Pass (5,106m).',
      duration: '15 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1691516347496-f9ada8248715?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuYXNsdSUyMGNpcmN1aXQlMjB0cmVrfGVufDB8fDB8fHww']
    },
    {
      _id: 't4',
      title: 'Langtang Valley',
      description: 'Known as the "Valley of Glaciers," this trek is the most accessible from Kathmandu. It’s a shorter journey (usually 7–10 days) that offers incredible mountain panoramas without the need for a domestic flight. You’ll experience the unique culture of the Tamang people and can hike up to Kyanjin Ri for stunning views of Langtang Lirung and surrounding peaks.',
      duration: '8 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1643548947288-fbf86caf414a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZ3RhbmclMjB0cmVrfGVufDB8fDB8fHww']
    },
    {
      _id: 't5',
      title: 'Mardi Himal',
      description: 'Mardi Himal is a rising star for those looking for a shorter, moderate trek with spectacular rewards. The trail follows a high ridge through rhododendron forests, keeping you "face-to-face" with the iconic Machhapuchhre (Fishtail Mountain). It is quieter than the nearby Annapurna Base Camp route and provides some of the best photography spots in the Himalayas.',
      duration: '6 Days',
      category: 'Trek',
      images: ['https://images.unsplash.com/photo-1571330422950-0de5787b593b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFyZGklMjBoaW1hbCUyMHRyZWt8ZW58MHx8MHx8fDA%3D']
    }
  ];

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTours(data);
          setFilteredTours(data);
        } else {
          // If no tours in DB, use fallbacks
          setTours(fallbackTours);
          setFilteredTours(fallbackTours);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err);
        setTours(fallbackTours);
        setFilteredTours(fallbackTours);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = tours;
    if (searchTerm) {
      result = result.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category !== 'All') {
      result = result.filter(t => t.category === category);
    }
    setFilteredTours(result);
  }, [searchTerm, category, tours]);

  const categories = ['All', 'Trek', 'Tour', 'Adventure'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Packages</h1>
          <p className="text-muted-foreground">From peaceful tours to challenging mountain treks, find your perfect adventure.</p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white p-6 rounded-3xl shadow-sm"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary"
            />
          </div>

          <Tabs value={category} onValueChange={setCategory} className="w-full md:w-auto">
            <TabsList className="bg-secondary/30 p-1 rounded-xl w-full md:w-auto overflow-x-auto flex justify-start">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[450px] bg-secondary/50 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : filteredTours.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {filteredTours.map((tour) => (
              <motion.div key={tour._id} variants={itemVariants}>
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-muted-foreground" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No tours found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
