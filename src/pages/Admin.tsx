import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Eye, EyeOff, MessageSquare, Package, Image as ImageIcon, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Admin() {
  const [tours, setTours] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newTour, setNewTour] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'Trek',
    featured: false,
    visible: true,
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [toursRes, inquiriesRes] = await Promise.all([
        fetch('/api/admin/tours'),
        fetch('/api/admin/inquiries')
      ]);
      const toursData = await toursRes.json();
      const inquiriesData = await inquiriesRes.json();
      
      if (Array.isArray(toursData)) {
        setTours(toursData);
      } else {
        console.error('Expected an array of tours, but got:', toursData);
        setTours([]);
      }
      
      if (Array.isArray(inquiriesData)) {
        setInquiries(inquiriesData);
      } else {
        console.error('Expected an array of inquiries, but got:', inquiriesData);
        setInquiries([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTour = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newTour).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }
    }

    try {
      const res = await fetch('/api/admin/tours', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setShowAddForm(false);
        setNewTour({
          title: '',
          description: '',
          price: '',
          duration: '',
          category: 'Trek',
          featured: false,
          visible: true,
        });
        setSelectedFiles(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/tours/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !current }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTour = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    try {
      await fetch(`/api/admin/tours/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="pt-32 container mx-auto px-4">Loading Admin Panel...</div>;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your tours and customer inquiries.</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="rounded-xl gap-2">
            {showAddForm ? <X size={20} /> : <Plus size={20} />}
            {showAddForm ? 'Cancel' : 'Add New Tour'}
          </Button>
        </div>

        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="rounded-3xl shadow-xl border-none">
              <CardHeader>
                <CardTitle>Create New Tour Package</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTour} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tour Title</label>
                      <Input 
                        required 
                        value={newTour.title} 
                        onChange={e => setNewTour({...newTour, title: e.target.value})}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <select 
                        className="w-full h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm"
                        value={newTour.category}
                        onChange={e => setNewTour({...newTour, category: e.target.value})}
                      >
                        <option value="Trek">Trek</option>
                        <option value="Tour">Tour</option>
                        <option value="Adventure">Adventure</option>
                        <option value="City">City</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price ($)</label>
                      <Input 
                        required 
                        type="number" 
                        value={newTour.price} 
                        onChange={e => setNewTour({...newTour, price: e.target.value})}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration (e.g. 5 Days)</label>
                      <Input 
                        required 
                        value={newTour.duration} 
                        onChange={e => setNewTour({...newTour, duration: e.target.value})}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      required 
                      value={newTour.description} 
                      onChange={e => setNewTour({...newTour, description: e.target.value})}
                      className="rounded-xl min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Images</label>
                    <div className="flex items-center gap-4 p-4 border-2 border-dashed rounded-xl border-muted-foreground/20">
                      <ImageIcon className="text-muted-foreground" size={24} />
                      <input 
                        type="file" 
                        multiple 
                        onChange={e => setSelectedFiles(e.target.files)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newTour.featured} 
                        onChange={e => setNewTour({...newTour, featured: e.target.checked})}
                      />
                      <span className="text-sm">Featured on Home Page</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newTour.visible} 
                        onChange={e => setNewTour({...newTour, visible: e.target.checked})}
                      />
                      <span className="text-sm">Visible to Public</span>
                    </label>
                  </div>
                  <Button type="submit" className="w-full rounded-xl h-12">Create Tour Package</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="tours" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm">
            <TabsTrigger value="tours" className="rounded-lg px-8 gap-2">
              <Package size={18} />
              Tours ({tours.length})
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="rounded-lg px-8 gap-2">
              <MessageSquare size={18} />
              Inquiries ({inquiries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tours">
            <div className="grid grid-cols-1 gap-4">
              {tours.map((tour) => (
                <Card key={tour._id} className="rounded-2xl border-none shadow-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={tour.images[0] || `https://picsum.photos/seed/${tour.title}/400/400`} 
                        alt={tour.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{tour.title}</h3>
                          <Badge variant={tour.visible ? 'default' : 'secondary'}>
                            {tour.visible ? 'Visible' : 'Hidden'}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                          <span>{tour.category}</span>
                          <span>•</span>
                          <span>{tour.duration}</span>
                        </div>
                        <p className="text-sm line-clamp-2 text-muted-foreground">{tour.description}</p>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-lg gap-2"
                          onClick={() => toggleVisibility(tour._id, tour.visible)}
                        >
                          {tour.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                          {tour.visible ? 'Hide' : 'Show'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="rounded-lg gap-2"
                          onClick={() => deleteTour(tour._id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="grid grid-cols-1 gap-4">
              {inquiries.map((inquiry) => (
                <Card key={inquiry._id} className="rounded-2xl border-none shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{inquiry.name}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{inquiry.email}</span>
                        <span>•</span>
                        <span>{inquiry.phone}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-secondary/50">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                  <Separator className="my-4 opacity-50" />
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Message:</p>
                    <p className="text-sm text-muted-foreground bg-secondary/20 p-4 rounded-xl italic">
                      "{inquiry.message}"
                    </p>
                  </div>
                  {inquiry.tourId && (
                    <div className="flex items-center gap-2 text-xs text-primary font-bold">
                      <Package size={14} />
                      Interested in: {inquiry.tourId.title}
                    </div>
                  )}
                </Card>
              ))}
              {inquiries.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl">
                  <p className="text-muted-foreground">No inquiries yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
