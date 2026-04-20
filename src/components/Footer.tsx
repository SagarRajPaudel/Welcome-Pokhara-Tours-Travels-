import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 text-primary">
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-none uppercase">Welcome Pokhara</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Tours & Travels</span>
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
            <h4 className="font-bold text-base mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Tours</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-6 uppercase tracking-wider">Contact Info</h4>
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

          <div>
            <h4 className="font-bold text-base mb-6 uppercase tracking-wider">Compliance</h4>
            <ul className="space-y-4">
              <li>
                <span className="text-[10px] uppercase font-bold text-primary block mb-1">Dpt. of Tourism</span>
                <span className="text-muted-foreground text-sm">Lic No: 1234/075/076</span>
              </li>
              <li>
                <span className="text-[10px] uppercase font-bold text-primary block mb-1">PAN / VAT</span>
                <span className="text-muted-foreground text-sm">No: 606789123</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-6 uppercase tracking-wider">Accreditations</h4>
            <div className="flex flex-wrap gap-4">
              <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-sm border border-border/50 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Rv8Ow_cRUSp6xRab-m4cJX6rhoEdHl6Ftw&s" 
                  alt="TAAN Member" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/taan/50/50";
                  }}
                />
              </div>
              <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-sm border border-border/50 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://enlokaantar.prixacdn.net/media/gallery_folder/NMA-Nepal-Mountaineering-Association_XVHh7XzebH.png" 
                  alt="NMA Member" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/nma/50/50";
                  }}
                />
              </div>
            </div>
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
