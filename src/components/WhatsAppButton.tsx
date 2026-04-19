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
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-10 right-10 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#128C7E] transition-colors border-none cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
    </motion.button>
  );
}
