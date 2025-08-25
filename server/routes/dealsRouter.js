import express from "express";
import { fetchDeals, getDealById } from "../controllers/dealController.js";

const router = express.Router();

router.get("/", fetchDeals);
router.get("/:id", getDealById)

export default router;
