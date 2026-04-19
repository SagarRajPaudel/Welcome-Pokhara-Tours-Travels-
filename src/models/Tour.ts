import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  title: string;
  description: string;
  price: number;
  duration: string;
  images: string[];
  featured: boolean;
  visible: boolean;
  category: string;
  createdAt: Date;
}

const TourSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
  category: { type: String, default: 'Trek' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);
