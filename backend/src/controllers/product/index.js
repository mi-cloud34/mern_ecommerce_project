import Product from "../../models/product";
import Category from "../../models/category";
import Boom from "boom";
import ProductSchema from "./validations";


const Create = async (req, res, next) => {
	const input =req.body
	//req.body.userId=req.user
	console.log(req.token);
	const { error } = ProductSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		input.photos = JSON.parse(input.photos);

		const product = new Product({userId:req.user,...input});
		const savedData = await product.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};

const Get = async (req, res, next) => {
	const { product_id } = req.params;

	if (!product_id) {
		return next(Boom.badRequest("Missing paramter (:product_id)"));
	}

	try {
		const product = await Product.findById(product_id);

		res.json(product);
	} catch (e) {
		next(e);
	}
};
const GetCategory = async (req, res, next) => {
	const {category_id} = req.params;
      console.log("id",category_id);
	if (!category_id) {
		return next(Boom.badRequest("Missing paramter (:category_id)"));
	}

	try {
		const category = await Category.findById(category_id);
		console.log("categoryyyy",category);
		if (category) {
			const product = await Product.find({categoryId:category._id});
		   res.json(product);
		}
		else{
			return next(Boom.badRequest("böyle bir categori bulunamadı"))
		}
	} catch (e) {
		next(e);
	}
};
const GetSubCategory = async (req, res, next) => {
	const {categoryId} = req.params;
	const {subId} = req.params;
	let p;
      console.log("id",categoryId);
	if (!categoryId) {
		return next(Boom.badRequest("Missing paramter (:categoryId)"));
	}
  const  add=async() => {
	p=await Product.find({subcategoryId:subId})
	console.log("ppp",p);
	res.json(p);
  }
	try {
		const category = await Category.findById(categoryId);
		console.log("categoryyyy",category);
		
		if (category) {
		
		 category.sub_category.map(item =>{if (item._id == subId) {
			add();
			
		 }} )
			
			
			/* category.sub_category.map((id) => {
				console.log("iddddddd",id._id);
				if (id) {
				 
					console.log("product",product); 
		            console.log("idddddd",id._id);
				}
			   }) */
			/*if (category.sub_category._id.include(subId)) {
				const product = await Product.find({subcategoryId:subId});
		        res.json(product);
			} */
			
		}
		
		else{
			return next(Boom.badRequest("böyle bir categori bulunamadı"))
		}
	
	} catch (e) {
		next(e);
	}
};
const Search=async (req, res) => {
	try {
	  const products = await Product.find({
		title: { $regex: req.params.name, $options: "i" },
	  });
  
	  res.json(products);
	} catch (e) {
	  res.status(500).json({ error: e.message });
	}
  };
const Update = async (req, res, next) => {
	const { product_id } = req.params;

	try {
		const updated = await Product.findByIdAndUpdate(product_id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { product_id } = req.params;

	try {
		const deleted = await Product.findByIdAndDelete(product_id);

		if (!deleted) {
			throw Boom.badRequest("Product not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

const limit = 12;
const GetList = async (req, res, next) => {
	let { page } = req.query;

	if (page < 1) {
		page = 1;
	}

	const skip = (parseInt(page) - 1) * limit;

	try {
		const products = await Product.find({})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.json(products);
	} catch (e) {
		next(e);
	}
};

export default {
	Create,
	Get,
	Update,
	Delete,
	GetList,
	GetCategory,
	GetSubCategory,
	Search
};
