import express from "express";
import logger from "../utils/logger";

const router = express.Router();

router.post("/", (req, res) => {
    logger.info(req.body);

    res.status(200).json({
        success: true
    });
});

export default router;