import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Compass, Shield, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TourCard from '@/components/TourCard';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '+9779856032330';
const LOGO_PATH = '/logo.png';

export default function Home() {
  const [featuredTours, setFeaturedTours] = useState<any[]>([]);

  const fallbackFeatured = [
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
      _id: 'f1',
      title: 'Rafting',
      description: 'Experience the thrill of white water rafting on the Trisuli River. Perfect for beginners and experienced rafters alike, with exciting rapids and beautiful scenery.',
      duration: '1 Day',
      category: 'Adventure',
      images: ['https://images.unsplash.com/photo-1629248457649-b082812aea6c?q=80&w=1170&auto=format&fit=crop']
    }
  ];

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedTours(data.slice(0, 3));
        } else {
          setFeaturedTours(fallbackFeatured);
        }
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err);
        setFeaturedTours(fallbackFeatured);
      });
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello, I am interested in planning a trip to Pokhara. Please help me.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
  };

  const services = [
    { icon: <Compass className="text-primary" size={32} />, title: 'Expert Guides', desc: 'Professional and local guides with years of experience in the Himalayas.' },
    { icon: <Shield className="text-primary" size={32} />, title: 'Safe Travel', desc: 'Your safety is our top priority. We follow all safety protocols and standards.' },
    { icon: <Users className="text-primary" size={32} />, title: 'Customized Trips', desc: 'Personalized itineraries tailored to your preferences and budget.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center bg-white rounded-[32px] p-8 md:p-12 shadow-[0_10px_30px_rgba(192,123,82,0.08)]"
          >
            <div className="hero-content">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-primary font-bold tracking-[0.2em] uppercase text-base mb-4"
              >
                Welcome Pokhara Tours & Travels
              </motion.p>
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                src={LOGO_PATH} 
                alt="Welcome Pokhara Logo" 
                className="h-32 w-auto object-contain mb-8"
                referrerPolicy="no-referrer"
              />
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[42px] md:text-[52px] font-[800] mb-6 leading-[1.1] tracking-[-1.5px] text-[#3A3530]"
              >
                Himalayan Dreams,<br />Tailored for You.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-[#6B655F] mb-10 leading-relaxed max-w-lg"
              >
                Experience Pokhara with the local experts. From Annapurna base camps to serene Phewa Lake retreats, we craft unforgettable memories.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                <Button 
                  size="lg" 
                  onClick={handleWhatsApp}
                  className="rounded-full h-14 px-8 text-base bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold gap-3 shadow-[0_8px_24px_rgba(37,211,102,0.2)] transition-transform hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </Button>
                
                <div className="flex gap-10">
                  <div className="stat-item">
                    <span className="block font-[800] text-2xl text-primary">15k+</span>
                    <span className="block text-[10px] uppercase tracking-[1px] text-[#6B655F] font-bold">Happy Travelers</span>
                  </div>
                  <div className="stat-item">
                    <span className="block font-[800] text-2xl text-primary">4.9</span>
                    <span className="block text-[10px] uppercase tracking-[1px] text-[#6B655F] font-bold">Star Rating</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative h-[320px] md:h-[400px] rounded-[24px] overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop"
                alt="Nepal Mountains"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground">We provide the best travel experiences in Nepal with a focus on quality, safety, and customer satisfaction.</motion.p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-[#FFF5D1]/40 hover:bg-[#FFF5D1]/60 transition-colors text-center cursor-default border-glow"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Adventures</h2>
              <p className="text-muted-foreground">Handpicked experiences that showcase the best of Pokhara and the surrounding Himalayas.</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80 font-bold gap-2 group" asChild>
              <Link to="/tours">
                View All Tours
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredTours.length > 0 ? (
              featuredTours.map((tour) => (
                <motion.div key={tour._id} variants={itemVariants}>
                  <TourCard tour={tour} />
                </motion.div>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-secondary/50 animate-pulse rounded-3xl"></div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground">Real stories from people who explored Nepal with us.</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { name: "Sarah Johnson", country: "Australia", text: "The Annapurna Base Camp trek was life-changing. Our guide was incredible and the organization was flawless. Highly recommend!" },
              { name: "Markus Weber", country: "Germany", text: "Pokhara is beautiful, but Welcome Pokhara made it magical. The city tour and paragliding were perfectly arranged." },
              { name: "Anjali Gupta", country: "India", text: "Professional, friendly, and very helpful. They customized our family trip perfectly. We felt safe and well-cared for." }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-secondary/20 border border-secondary/50 transition-shadow hover:shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-yellow-500 text-lg">★</span>)}
                </div>
                <p className="italic text-muted-foreground mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8 max-w-3xl mx-auto leading-tight"
          >
            Ready to Start Your Himalayan Adventure?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-12 opacity-90 max-w-2xl mx-auto"
          >
            Chat with us on WhatsApp for a quick quote and personalized itinerary. No strings attached!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={handleWhatsApp}
              className="rounded-2xl h-16 px-10 text-xl bg-white text-primary hover:bg-secondary gap-3 transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={24} />
              Chat on WhatsApp
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-2xl h-16 px-10 text-xl border-white/30 text-white hover:bg-white/10 transition-transform hover:scale-105 active:scale-95"
              asChild
            >
              <Link to="/contact">Send Inquiry</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Helper component for Hero
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
