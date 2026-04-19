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
    email: '',
    phone: '',
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
        setFormData({ name: '', email: '', phone: '', message: '' });
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
        <h3 className="text-2xl font-bold mb-2">Inquiry Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)} className="rounded-xl">
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium px-1">Full Name</label>
          <Input
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-xl bg-secondary/50 border-none h-12 focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium px-1">Email Address</label>
          <Input
            required
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="rounded-xl bg-secondary/50 border-none h-12 focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium px-1">Phone Number</label>
        <Input
          required
          placeholder="+977 98XXXXXXX"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="rounded-xl bg-secondary/50 border-none h-12 focus-visible:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium px-1">Message</label>
        <Textarea
          required
          placeholder="Tell us about your travel plans..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="rounded-xl bg-secondary/50 border-none min-h-[120px] focus-visible:ring-primary"
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-white font-bold gap-2"
      >
        {loading ? 'Sending...' : (
          <>
            Send Inquiry
            <Send size={18} />
          </>
        )}
      </Button>
    </form>
  );
}
