import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: [
    {
       sub_categories: String,
       category_at: Date,
       categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category",
      }, 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports =mongoose.models.Category || mongoose.model('Category', CategorySchema);
//const Category = mongoose.model('Category', CategorySchema);

//export default Category;
//||mongoose.model('Category', CategorySchema);
