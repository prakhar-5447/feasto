import express from "express";
const router = express.Router();

import * as searchController from "../controllers/search.controller";

router.get(
    "/search-items",
    searchController.searchItems
);

router.get(
    "/restaurants",
    searchController.searchRestaurants
);

export default router;