import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass, Users, Award } from 'lucide-react';

const LOGO_PATH = '/logo.png';

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
    <div className="pt-32 pb-24 bg-mountain-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-topographic opacity-[0.03] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src={LOGO_PATH} 
                alt="Welcome Pokhara Logo" 
                className="h-20 w-auto object-contain mb-6"
                referrerPolicy="no-referrer"
              />
              <Badge className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold border-none">
                Our Story
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Crafting Unforgettable <span className="text-primary">Himalayan</span> Journeys
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
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
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
