import express from "express";
import * as searchController from "../controllers/search.controller";

const router = express.Router();

router.get("/search-items", searchController.searchItems);
router.get("/restaurants", searchController.searchRestaurants);

export default router;