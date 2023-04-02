import Joi from 'joi';

const CategorySchema = Joi.object({
  category: Joi.string().required(),
});

export default CategorySchema;
