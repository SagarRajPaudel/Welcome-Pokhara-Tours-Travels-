import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TourCard from '@/components/TourCard';
import { FALLBACK_TOURS } from '@/constants/tours';

export default function Tours() {
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTours(data);
          setFilteredTours(data);
        } else {
          // If no tours in DB, use fallbacks
          setTours(FALLBACK_TOURS);
          setFilteredTours(FALLBACK_TOURS);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err);
        setTours(FALLBACK_TOURS);
        setFilteredTours(FALLBACK_TOURS);
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
    <div className="pt-32 pb-24 min-h-screen bg-mountain-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-topographic opacity-[0.03] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
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
          className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-primary/5"
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
