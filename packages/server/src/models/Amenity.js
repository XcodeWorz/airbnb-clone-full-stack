import mongoose from 'mongoose';

export const AmenitiySchema = new mongoose.Schema(
  {
    name: { type: 'String', unique: true },
    enabled: { type: 'Boolean', default: true },
  },
  { _id: false },
);

export default mongoose.model('Amenity', AmenitiySchema);
