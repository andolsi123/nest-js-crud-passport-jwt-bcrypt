import * as mongoose from 'mongoose';
import { ItemSchema } from '../../items/shema/itemsShema.shema';

export const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  birthday: String,
  email: String,
  password: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: ItemSchema}],
});
