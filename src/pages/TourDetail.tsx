import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Tag, MapPin, CheckCircle2, MessageCircle, ArrowLeft, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InquiryForm from '@/components/InquiryForm';

const WHATSAPP_NUMBER = '+9779856032330';

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
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
        const allTours = Array.isArray(data) ? [...data, ...fallbackTours] : fallbackTours;
        const found = allTours.find(t => t._id === id);
        setTour(found);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err);
        const found = fallbackTours.find(t => t._id === id);
        setTour(found);
        setLoading(false);
      });
  }, [id]);

  const handleWhatsApp = () => {
    if (!tour) return;
    const message = encodeURIComponent(`Hello, I am interested in the ${tour.title} package. Please provide more details.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
  };

  if (loading) return <div className="pt-32 container mx-auto px-4 h-screen">Loading...</div>;
  if (!tour) return <div className="pt-32 container mx-auto px-4 h-screen text-center">Tour not found.</div>;

  return (
    <div className="pt-24 pb-24 bg-background">
      <div className="container mx-auto px-4">
        <Link to="/tours" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={18} />
          Back to all tours
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 shadow-xl">
                <img
                  src={tour.images[0] || `https://picsum.photos/seed/${tour.title}/1200/800`}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (tour.images && tour.images.length > 1) {
                      e.currentTarget.src = tour.images[1];
                    } else {
                      e.currentTarget.src = `https://picsum.photos/seed/${tour.title}/1200/800`;
                    }
                  }}
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <Badge className="bg-white/90 text-primary hover:bg-white border-none font-bold px-4 py-1.5 rounded-full">
                    {tour.category}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Clock className="text-primary" size={18} />
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <MapPin className="text-primary" size={18} />
                  <span className="font-medium">Pokhara, Nepal</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{tour.title}</h1>
              
              <div className="prose prose-lg max-w-none mb-12">
                <h3 className="text-2xl font-bold mb-4">Overview</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {tour.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5">
                  <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={20} />
                    What's Included
                  </h4>
                  <ul className="space-y-4">
                    {['Professional Guide', 'Transportation', 'Entry Fees', 'Bottled Water'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5">
                  <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <X className="text-red-500" size={20} />
                    What's Not Included
                  </h4>
                  <ul className="space-y-4">
                    {['Personal Expenses', 'Travel Insurance', 'Tips for Guide', 'Meals not specified'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-300"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* WhatsApp CTA */}
              <div className="bg-primary text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Book via WhatsApp</h3>
                <p className="opacity-90 mb-8 text-sm leading-relaxed">
                  The fastest way to book! Chat directly with our travel experts for instant confirmation and customized pricing.
                </p>
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-secondary font-bold text-lg gap-3"
                >
                  <MessageCircle size={24} />
                  Chat Now
                </Button>
                <p className="text-center mt-4 text-xs opacity-70">Typically responds in 5 minutes</p>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary/5">
                <h3 className="text-xl font-bold mb-6">Quick Inquiry</h3>
                <InquiryForm tourId={tour._id} tourName={tour.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function X({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
