import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: [String],
  categoryId: { type:mongoose.Types.ObjectId,required:true,ref:"Category" },
  subcategoryId:{
    type:String,
    required:true
  },
  userId: {
    type: Schema.Types.ObjectId,
   // required:true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Product = mongoose.model('product', ProductSchema);

export default Product;
