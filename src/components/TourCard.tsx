import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Clock, Tag, MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface TourCardProps {
  tour: any;
}

const WHATSAPP_NUMBER = '+9779856032330';

export default function TourCard({ tour }: { tour: any, key?: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(`Hello, I am interested in the ${tour.title} package. Please provide more details.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="perspective-1000"
    >
      <Link to={`/tours/${tour._id}`}>
        <Card className="overflow-hidden border-none shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-[24px] bg-white p-4 group h-full flex flex-col gap-3 transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <div 
            className="relative h-[140px] rounded-[16px] overflow-hidden"
            style={{ 
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d"
            }}
          >
            <img
              src={tour.images[0] || `https://picsum.photos/seed/${tour.title}/800/600`}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (tour.images && tour.images.length > 1) {
                  e.currentTarget.src = tour.images[1];
                } else {
                  e.currentTarget.src = `https://picsum.photos/seed/${tour.title}/800/600`;
                }
              }}
            />
          </div>
          <div 
            className="flex-grow"
            style={{ transform: "translateZ(20px)" }}
          >
            <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {tour.title}
            </h3>
            <p className="text-[#6B655F] text-[13px] line-clamp-2 leading-relaxed">
              {tour.duration} &bull; {tour.category}
            </p>
          </div>
          <div 
            className="flex justify-end items-center mt-2"
            style={{ transform: "translateZ(40px)" }}
          >
            <Button 
              onClick={handleWhatsApp}
              variant="outline"
              className="h-8 rounded-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-[11px] font-bold uppercase tracking-[0.5px] px-4"
            >
              Quick Book
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
