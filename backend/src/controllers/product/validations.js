import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.number().required(),
  location: Joi.string().required(),
  categoryId: Joi.string().required(),
  subcategoryId: Joi.string().required(),
  photos: Joi.string(),
});

export default ProductSchema;
