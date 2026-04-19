import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const LOGO_PATH = '/logo.png';

export default function Footer() {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src={LOGO_PATH} 
                alt="Welcome Pokhara Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden flex-col" style={{ display: 'none' }}>
                <span className="font-bold text-lg tracking-tight leading-none">WELCOME POKHARA</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Tours & Travels</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Your gateway to the majestic Himalayas. We provide curated trekking and tour experiences in Pokhara and across Nepal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Tours</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li><span className="text-muted-foreground text-sm">Trekking & Hiking</span></li>
              <li><span className="text-muted-foreground text-sm">City Tours</span></li>
              <li><span className="text-muted-foreground text-sm">Adventure Sports</span></li>
              <li><span className="text-muted-foreground text-sm">Hotel Booking</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <span className="text-muted-foreground text-sm">25 Lalupate Margha, Pokhara 33700</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span className="text-muted-foreground text-sm">+977 9856032330</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span className="text-muted-foreground text-sm">info@welcomepokhara.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-top border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Welcome Pokhara Tours & Travels. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-muted-foreground hover:text-primary text-xs">Privacy Policy</Link>
            <Link to="#" className="text-muted-foreground hover:text-primary text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
