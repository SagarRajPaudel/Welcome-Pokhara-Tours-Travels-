import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass, Users, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function About() {
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
    <div className="pt-32 pb-24 bg-mountain-gradient relative overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-topographic opacity-[0.03] pointer-events-none"></div>
      
      {/* 3D Floating Elements */}
      <motion.div
        animate={{ 
          rotateX: [0, 15, 0],
          rotateY: [0, 10, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="mb-8" style={{ transform: "translateZ(20px)" }}>
              <Badge className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold border-none">
                Our Story
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight" style={{ transform: "translateZ(40px)" }}>
              Crafting Unforgettable <span className="text-primary">Himalayan</span> Journeys
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed" style={{ transform: "translateZ(10px)" }}>
              Welcome Pokhara Tours & Travels was born out of a deep love for the mountains and a desire to share the authentic beauty of Nepal with the world. Based in Pokhara, we have been serving travelers for over a decade.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is simple: to provide personalized, safe, and sustainable travel experiences that leave you with memories to last a lifetime. Whether you're seeking the thrill of a high-altitude trek or the tranquility of a lakeside retreat, we are here to make it happen.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <h4 className="text-4xl font-bold text-primary mb-2">10+</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Years Experience</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <h4 className="text-4xl font-bold text-primary mb-2">5k+</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Happy Travelers</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 group">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop"
                alt="Our Team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary rounded-3xl -z-0 hidden md:block"
            ></motion.div>
            <motion.div 
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -right-8 w-48 h-48 border-4 border-primary/20 rounded-3xl -z-0 hidden md:block"
            ></motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-white/70 backdrop-blur-md rounded-[3rem] p-12 md:p-20 shadow-sm border border-primary/5"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground">The principles that guide every trip we plan.</motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Compass className="text-primary" size={32} />, title: "Authenticity", desc: "We believe in real experiences, local connections, and genuine hospitality." },
              { icon: <Award className="text-primary" size={32} />, title: "Quality", desc: "From transport to accommodation, we never compromise on the quality of your trip." },
              { icon: <Users className="text-primary" size={32} />, title: "Sustainability", desc: "We are committed to preserving the natural beauty and culture of Nepal for future generations." }
            ].map((v, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-[#FFF5D1] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors group-hover:bg-primary/10 border-glow"
                >
                  {v.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legal & Compliance Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-24 bg-white/50 backdrop-blur-sm rounded-[3rem] p-12 md:p-16 border border-primary/5"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Legal & Compliance</h2>
            <p className="text-muted-foreground">Officially registered and authorized by the Government of Nepal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {/* TAAN Logo */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-32 h-32 flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm transition-transform group-hover:scale-105 border border-primary/5">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Rv8Ow_cRUSp6xRab-m4cJX6rhoEdHl6Ftw&s" 
                  alt="TAAN - Trekking Agencies' Association of Nepal" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/taan/150/150";
                  }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-center">TAAN Member</span>
            </div>

            {/* NMA Logo */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-32 h-32 flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm transition-transform group-hover:scale-105 border border-primary/5">
                <img 
                  src="https://enlokaantar.prixacdn.net/media/gallery_folder/NMA-Nepal-Mountaineering-Association_XVHh7XzebH.png" 
                  alt="NMA - Nepal Mountaineering Association" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/nma/150/150";
                  }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-center">NMA Member</span>
            </div>

            {/* License Info */}
            <div className="lg:col-span-2 w-full">
              <div className="bg-white/50 rounded-2xl p-6 border border-primary/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">Tourism License</h4>
                    <p className="text-lg font-bold text-[#3A3530]">1234/075/076</p>
                    <p className="text-xs text-muted-foreground mt-1">Dpt. of Tourism, Nepal</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">PAN / VAT Number</h4>
                    <p className="text-lg font-bold text-[#3A3530]">606789123</p>
                    <p className="text-xs text-muted-foreground mt-1">Registered Business ID</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

