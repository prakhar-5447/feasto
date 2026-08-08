import express from "express";
const router = express.Router();

import * as searchController from "../controllers/search.controller";

router.get(
    "/search-items",
    searchController.searchItems
);

export default router;