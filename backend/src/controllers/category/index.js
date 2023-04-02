import User from '../../models/user';
import Category from '../../models/Category';
import Boom from 'boom';
import CategorySchema from './validations';

const Create = async (req, res, next) => {
	//userId = req.user;
	const input = req.body;
	const { error } = CategorySchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		//input.photos = JSON.parse(input.photos);

		const category = new Category({userId:req.user,...input});
		const savedData = await category.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};


const List = async (req, res, next) => {
  try {
    const Categorys = await Category.find({})
	//.populate('user', '-password -__v').populate('category');

    res.json(Categorys);
  } catch (e) {
    next(e);
  }
};
const CreateSubCategory=async (req,res,next)=>{
  const { category_id } = req.params;
	if (!category_id) {
		return next(Boom.badRequest("Missing paramter (:category_id)"));
	}
  try {
	const categories = await Category.findById(category_id);
  const sub = {
    ...req.body,
    category_at: new Date(),
    categoryId: category_id,
  };
  const subcategory=categories.sub_category.push(sub)
		const savedData = await categories.save();
		res.json(savedData);
	} catch (e) {
		next(e);
	}
}
const Get = async (req, res, next) => {
	const { category_id } = req.params;

	if (!category_id) {
		return next(Boom.badRequest("Missing paramter (:category_id)"));
	}

	try {
		const category = await Category.findById(category_id);

		res.json(category);
	} catch (e) {
		next(e);
	}
};

export default {
  Create,
  List,
  Get,
  CreateSubCategory
};
