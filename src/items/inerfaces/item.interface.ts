import { Document } from 'mongoose';

export interface Item extends Document {
  name: string;
  description: string;
  qty: number;
}
