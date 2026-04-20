import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight leading-none text-[#8E5431]">Welcome Pokhara</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all relative px-4 py-2 rounded-full ${
                location.pathname === link.path 
                ? 'text-primary bg-[#FFF5D1] border-glow' 
                : 'text-muted-foreground hover:text-primary hover:bg-[#FFF5D1]/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 py-2 text-xs font-bold" asChild>
            <Link to="/contact">Plan My Trip</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center bg-white border-b border-secondary/50">
              <span className="font-extrabold text-lg text-primary">Explore Pokhara</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow flex flex-col justify-end p-8 gap-4 pb-20">
              <div className="space-y-2 mb-8">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Main Menu</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between w-full p-4 rounded-2xl text-xl font-bold transition-all ${
                      location.pathname === link.path 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-secondary/30 text-foreground active:bg-secondary/50'
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </Link>
                ))}
              </div>
              
              <Button 
                className="w-full h-16 rounded-2xl text-lg font-bold bg-[#3A3530] text-white hover:bg-black active:scale-95 transition-transform" 
                asChild
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>Plan Your Trip</Link>
              </Button>
            </div>
            
            <div className="p-8 pt-0 flex justify-center gap-6 text-muted-foreground opacity-60">
              <span className="text-xs font-bold">Safe Travels</span>
              <span className="text-xs font-bold">•</span>
              <span className="text-xs font-bold">24/7 Support</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
