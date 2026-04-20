import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Tag, MapPin, CheckCircle2, MessageCircle, ArrowLeft, Calendar, Users, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InquiryForm from '@/components/InquiryForm';
import { FALLBACK_TOURS } from '@/constants/tours';

const WHATSAPP_NUMBER = '+9779856032330';

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        const allTours = Array.isArray(data) ? [...data, ...FALLBACK_TOURS] : FALLBACK_TOURS;
        const found = allTours.find(t => t._id === id);
        setTour(found);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err);
        const found = FALLBACK_TOURS.find((t: any) => t._id === id);
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
    <div className="pt-24 pb-24 bg-background text-[#3A3530]">
      <div className="container mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <Link to="/tours" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={18} />
          Back to all tours
        </Link>
        
        {/* Conversion Header: Title & CTA Above the Fold */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-8">
            <div className="flex-grow max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold px-4 py-1 rounded-full uppercase text-[10px] tracking-widest">
                  {tour.category}
                </Badge>
                <div className="flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground">
                  <MapPin size={14} className="text-primary" />
                  Nepal
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-[800] tracking-tight leading-[1.1] mb-6">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Clock className="text-primary" size={24} />
                  <span className="font-bold text-xl">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 text-lg">
                  {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                  <span className="ml-2 text-muted-foreground text-sm font-medium">4.9/5 Excellent</span>
                </div>
              </div>
            </div>
            
            {/* Primary Above-Fold CTA */}
            <div className="w-full lg:w-auto shrink-0">
              <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row lg:flex-col gap-2">
                <Button 
                  onClick={handleWhatsApp}
                  className="h-16 px-10 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold text-xl gap-3 shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={24} />
                  Check Availability
                </Button>
                <p className="text-[10px] uppercase tracking-widest font-bold text-center text-muted-foreground py-2 italic">
                  Personal Guide Included
                </p>
              </div>
            </div>
          </div>

          {/* Hero Gallery Image */}
          <div className="relative h-[450px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
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
          </div>
        </div>

        {/* Content Layout: Scavenger-hunt proof */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {/* Clear Nav sections */}
            <div className="space-y-24">
              {/* 1. OVERVIEW */}
              <section id="overview">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full"></div>
                  <h3 className="text-3xl font-[800]">The Experience</h3>
                </div>
                <div className="bg-white/50 p-10 rounded-[2.5rem] border border-primary/5 shadow-sm">
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                    {tour.description}
                  </p>
                </div>
              </section>

              {/* 2. LOGISTICS: What's In / Out */}
              <section id="logistics" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-primary/5 hover:border-green-500/20 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8">
                    <CheckCircle2 className="text-green-500" size={28} />
                  </div>
                  <h4 className="font-bold text-xl mb-6">What's Included</h4>
                  <ul className="space-y-5">
                    {['Professional Local Guide', 'All Ground Transportation', 'Permits & Entry Fees', 'Safe Drinking Water', 'Emergency First Aid Kit'].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-muted-foreground">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-primary/5 hover:border-red-500/20 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8">
                    <X className="text-red-500" size={28} />
                  </div>
                  <h4 className="font-bold text-xl mb-6">Not Included</h4>
                  <ul className="space-y-5">
                    {['International Airfare', 'Nepal Entry Visa', 'Travel Insurance', 'Personal Equipment', 'Tips & Gratuities'].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-muted-foreground">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-300 shrink-0"></div>
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 3. ITINERARY: Step by Step */}
              <section id="itinerary">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-1 bg-primary rounded-full"></div>
                  <h3 className="text-3xl font-[800]">Trip Flow</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { day: 1, title: 'Arrival & Welcome Dinner', desc: 'Arrive in Pokhara, meet your expert guide team, and enjoy a traditional preparation dinner.' },
                    { day: 2, title: 'Immersion Starts', desc: 'Journey deep into the local landscapes, beginning the core experience with early morning light.' },
                    { day: '3-5', title: 'The Heart of the Adventure', desc: 'Steady exploration of the high mountains, allowing for deep cultural and natural immersion.' },
                    { day: 'Last', title: 'Celebration & Farewell', desc: 'Capture final memories, celebrate your achievement, and safe return to your accommodation.' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-8 p-8 bg-white/70 rounded-3xl border border-primary/5 hover:shadow-xl hover:border-primary/20 transition-all group">
                      <div className="shrink-0 w-20 h-20 rounded-[1.5rem] bg-primary flex flex-col items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="text-[10px] uppercase font-[800] tracking-widest opacity-80">Day</span>
                        <span className="text-2xl font-[800]">{step.day}</span>
                      </div>
                      <div className="flex-grow pt-2">
                        <h5 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{step.title}</h5>
                        <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Sticky Conversion Unit */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Primary Booking Panel */}
              <div className="bg-white p-10 rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all"></div>
                
                <h3 className="text-2xl font-[800] mb-3">Book Personal Tour</h3>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  Lock in your adventure with our local experts. We offer 100% flexible booking.
                </p>

                <div className="space-y-4 mb-10">
                  <Button 
                    onClick={handleWhatsApp}
                    className="w-full h-16 rounded-2xl bg-[#25D366] text-white hover:bg-[#128C7E] font-bold text-xl gap-3 shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle size={24} />
                    Chat with Expert
                  </Button>
                  <p className="text-center text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    Average response: 10 Mins
                  </p>
                </div>
                
                <div className="pt-8 border-t border-secondary/50">
                  <h4 className="font-bold text-xs mb-6 uppercase tracking-widest text-primary">Quick Inquiry Form</h4>
                  <InquiryForm tourId={tour._id} tourName={tour.title} />
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white px-6 py-4 rounded-2xl flex items-center gap-4 border border-primary/10 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Certified Expert</p>
                    <p className="text-xs text-muted-foreground">Local Pokhara Authority</p>
                  </div>
                </div>
                <div className="bg-white px-6 py-4 rounded-2xl flex items-center gap-4 border border-primary/10 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 text-green-600">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Secure Booking</p>
                    <p className="text-xs text-muted-foreground">Verified Local Agency</p>
                  </div>
                </div>
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
