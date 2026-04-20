import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Compass, Shield, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TourCard from '@/components/TourCard';
import { Link } from 'react-router-dom';
import { FALLBACK_TOURS } from '@/constants/tours';

const WHATSAPP_NUMBER = '+9779856032330';

export default function Home() {
  const [featuredTours, setFeaturedTours] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedTours(data.slice(0, 3));
        } else {
          setFeaturedTours(FALLBACK_TOURS.slice(4, 7)); // Show some treks as featured
        }
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err);
        setFeaturedTours(FALLBACK_TOURS.slice(4, 7));
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
    <div className="overflow-hidden bg-mountain-gradient">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative perspective-1000">
        <div className="absolute inset-0 bg-topographic opacity-[0.03] pointer-events-none"></div>
        
        {/* Floating 3D elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotateZ: [0, 5, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotateZ: [0, -5, 0],
            rotateY: [0, 15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-[5%] w-48 h-48 bg-[#FFF5D1]/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, rotateX: 45, y: 50, z: -100 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center bg-white/70 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(192,123,82,0.12)] border border-white/50"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="hero-content" style={{ transform: "translateZ(30px)" }}>
              <motion.p 
                initial={{ opacity: 0, x: -20, z: 20 }}
                animate={{ opacity: 1, x: 0, z: 0 }}
                transition={{ delay: 0.3 }}
                className="text-primary font-bold tracking-[0.2em] uppercase text-base mb-8"
              >
                Welcome Pokhara Tours & Travels
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, x: -30, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
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
              initial={{ opacity: 0, scale: 0.9, rotateX: 15, z: -50 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="relative h-[320px] md:h-[400px] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop"
                alt="Nepal Mountains"
                className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-topographic opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
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
                whileHover={{ 
                  y: -15,
                  rotateY: 10,
                  rotateX: -5,
                  z: 20
                }}
                className="p-8 rounded-3xl bg-[#FFF5D1]/40 hover:bg-[#FFF5D1]/60 transition-all text-center cursor-default border-glow shadow-sm hover:shadow-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {service.icon}
                </motion.div>
                <div style={{ transform: "translateZ(15px)" }}>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </div>
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
              { 
                name: "Bikalpa Bastola", 
                text: "It was a wonderful journey to ABC(annapurna base camp) trek. We saw wonderful views from the base and during the journey. Highly recommend everyone to go on this trek once in their lifetime.", 
                time: "6 months ago" 
              },
              { 
                name: "M M", 
                text: "Rabindra & wife Sorba sorted all my transport up to Muktinath & KTM with total professionalism and a personal touch. Great people dedicated to serving you .. highly recommended!", 
                time: "5 months ago" 
              },
              { 
                name: "Olivier Naafs", 
                text: "We did a 10 day trek to Ice Lake and Thorong La pass. Everything was taken care of, and especially our guide, Kali, was stellar. Very experienced, kind and helpful.", 
                time: "6 months ago" 
              },
              { 
                name: "Nick Lenzer", 
                text: "Rabin was so helpful. These guys are great. Good laundry service, can help with cars, flights, anything you need. True legends of Pokhara! Super nice guys.", 
                time: "4 months ago" 
              },
              { 
                name: "Mohammad Azizeddin", 
                text: "It was a very good trip with excellent planning. I highly recommend choosing this agency for your trip to Nepal — they will help you create wonderful memories.", 
                time: "4 months ago" 
              },
              { 
                name: "Alapon Banerjee", 
                text: "Perfect Professional Tour operator. No unwanted talkings and fake assurance. Extremely helpful and consider only the best for tourist and their need. Budget friendly and dependable.", 
                time: "3 months ago" 
              },
              { 
                name: "John Duvier", 
                text: "We had an exciting and smooth heli tour from Pokhara to Annapurna BC. All carefully and professionally handled by the agency. Regards Tatiana and John.", 
                time: "6 months ago" 
              },
              { 
                name: "Gabriela Zaniboni", 
                text: "The owner, Rabindra, has been very kind and solved a very important problem with our flight. Thanks a lot Rabindra! No doubt to hire him for your tours and travels!", 
                time: "11 months ago" 
              },
              { 
                name: "Kristian Strecker", 
                text: "We booked a rafting tour and a trip to Chitwan... Thank you... everything was fine!", 
                time: "3 months ago" 
              }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-secondary/20 border border-secondary/50 transition-shadow hover:shadow-lg flex flex-col h-full"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-yellow-500 text-lg">★</span>)}
                </div>
                <p className="italic text-muted-foreground mb-6 flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
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
