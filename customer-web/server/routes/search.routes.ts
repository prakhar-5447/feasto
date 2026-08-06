import express from "express";
const router = express.Router();

import { searchRestaurants } from "../controllers/search.controller";

router.get(
    "/search-items",
    searchRestaurants
);

export default router;