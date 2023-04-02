import express from "express";
const router = express.Router();

import Category from "../controllers/category";
// import cache from '../cache';

import grantAccess from "../middlewares/grantAccess";
import { verifyAccessToken } from "../helpers/jwt";

router.post(
	"/",
	verifyAccessToken,
	grantAccess("createAny", "category"),
	Category.Create
);
router.get(
	"/:category_id",
	// verifyAccessToken,
	// grantAccess('readAny', 'category'),
	// cache.route(),
	Category.Get
);
// router.get('/', cache.route(), Category.GetList);
router.get("/", Category.List);
router.post("/:category_id",
//verifyAccessToken,
//grantAccess("createAny", "category"),
 Category.CreateSubCategory);


export default router;
