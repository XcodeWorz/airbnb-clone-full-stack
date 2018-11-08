import mongoose from 'mongoose';
import { categories } from '@airbnb-clone/common';
import { LocationSchema } from './Location';

const AirbnbSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    location: LocationSchema,
    price: Number,
    pictures: String,
    category: {
      type: String,
      enum: categories,
    },
    guests: Number,
    beds: { type: Number, default: 1 },
    baths: { type: Number, default: 1 },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amenities: {
      type: [String],
      enum: ['wifi', 'parking', 'swimming-pool'],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Airbnb', AirbnbSchema);
