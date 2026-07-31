import express from "express";
const router = express.Router();

import cartController from "../controllers/cart.controller";

import { protect } from '../middlewares/auth.middleware';

import validate from "../middlewares/validation.middleware";

const {
    addToCartSchema
} = require("../validations/cart.validation");

router.post(
    "/add",
    protect,
    validate(addToCartSchema),
    cartController.addToCart
);

export default router;