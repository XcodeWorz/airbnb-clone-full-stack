import mongoose from 'mongoose';
import { AmenitiySchema } from './Amenity';
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
      enum: ['house', 'apartment', 'bungalow', 'cabin', 'loft', 'villa'],
    },
    guests: Number,
    beds: { type: Number, default: 1 },
    baths: { type: Number, default: 1 },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amenities: [{ type: String, enum: ['wifi', 'parking', 'swimmingpool'] }],
  },
  { timestamps: true },
);

export default mongoose.model('Airbnb', AirbnbSchema);
