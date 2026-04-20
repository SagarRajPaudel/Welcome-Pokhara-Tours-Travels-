import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

interface InquiryFormProps {
  tourId?: string;
  tourName?: string;
}

export default function InquiryForm({ tourId, tourName }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: tourName ? `I am interested in the ${tourName} package. Please provide more details.` : '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tourId }),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', contact: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl text-center border border-primary/10"
      >
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-[#3A3530]">Inquiry Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you! Our team will get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)} className="rounded-xl border-primary/20 text-primary">
          Send Another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Input
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-2xl bg-secondary/30 border-none h-14 px-5 text-base focus-visible:ring-primary shadow-inner"
          />
        </div>
        
        <div className="space-y-1.5">
          <Input
            required
            placeholder="Email or WhatsApp Number"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="rounded-2xl bg-secondary/30 border-none h-14 px-5 text-base focus-visible:ring-primary shadow-inner"
          />
        </div>

        <div className="space-y-1.5">
          <Textarea
            required
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="rounded-2xl bg-secondary/30 border-none min-h-[100px] px-5 py-4 text-base focus-visible:ring-primary shadow-inner"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full rounded-2xl h-14 bg-primary hover:bg-primary/90 text-white font-[800] text-lg gap-3 shadow-lg shadow-primary/20 transition-transform active:scale-95"
      >
        {loading ? 'Sending...' : (
          <>
            Send Message
            <Send size={20} />
          </>
        )}
      </Button>
      
      <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold opacity-60">
        Response Guaranteed <span className="text-primary">within 24h</span>
      </p>
    </form>
  );
}
