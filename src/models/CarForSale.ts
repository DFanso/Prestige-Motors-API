import mongoose, { Document, Schema } from 'mongoose';

export interface ICarForSale extends Document {
  carName: string;
  smallDescription: string;
  largeDescription: string;
  transmission: string;
  mileage: number;
  interiorColor: string;
  exteriorColor: string;
  pictures: string[];
}

const carForSaleSchema: Schema<ICarForSale> = new Schema({
  carName: { type: String, required: true },
  smallDescription: { type: String, required: true },
  largeDescription: { type: String, required: true },
  transmission: { type: String, required: true },
  mileage: { type: Number, required: true },
  interiorColor: { type: String, required: true },
  exteriorColor: { type: String, required: true },
  pictures: [{ type: String, required: true }],
});

export default mongoose.model<ICarForSale>('CarForSale', carForSaleSchema);
