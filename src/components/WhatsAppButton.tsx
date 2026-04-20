import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '+9779856032330';

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent("Hello, I am interested in your tour packages. Please provide more details.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="bg-white px-4 py-2 rounded-2xl shadow-lg border border-[#25D366]/20 mb-1"
      >
        <p className="text-[10px] md:text-xs font-bold text-[#3A3530] whitespace-nowrap">
          Quick Response within <span className="text-[#25D366]">24h</span>
        </p>
      </motion.div>
      
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="pointer-events-auto bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_12px_32px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#128C7E] transition-colors border-none cursor-pointer relative"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing effect */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
        />
        <MessageCircle className="w-8 h-8 md:w-9 md:h-9" />
      </motion.button>
    </div>
  );
}
