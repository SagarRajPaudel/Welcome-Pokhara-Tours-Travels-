import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '+9779856032330';

export default function Contact() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello, I have some questions about your tour packages.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="pt-32 pb-24 bg-mountain-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-topographic opacity-[0.03] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-muted-foreground">Have questions? We're here to help you plan your dream trip to Nepal.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-primary/5"
            >
              <h3 className="text-xl font-bold mb-8">Contact Information</h3>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6"
              >
                {[
                  { icon: <MapPin size={20} />, label: "Our Office", value: "25 Lalupate Margha, Pokhara 33700" },
                  { icon: <Phone size={20} />, label: "Phone Number", value: "+977 9856032330" },
                  { icon: <Mail size={20} />, label: "Email Address", value: "info@welcomepokhara.com" },
                  { icon: <Clock size={20} />, label: "Working Hours", value: "Sun - Fri: 9:00 AM - 6:00 PM" }
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF5D1] flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white border-glow">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"
              ></motion.div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Instant Support</h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">
                  Need a quick answer? Chat with our team on WhatsApp for immediate assistance.
                </p>
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full h-12 rounded-xl bg-white text-primary hover:bg-secondary font-bold gap-2 transition-transform hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-lg border border-primary/5"
            >
              <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
              <InquiryForm />
            </motion.div>
          </div>
        </div>

        {/* Map Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[3rem] overflow-hidden h-96 shadow-sm grayscale hover:grayscale-0 transition-all duration-700"
        >
          <iframe 
            src="https://maps.google.com/maps?q=25%20Lalupate%20Margha,%20Pokhara%2033700&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
