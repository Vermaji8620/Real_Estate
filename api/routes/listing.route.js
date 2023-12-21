import express from "express";
const router = express.Router();
import { createListing } from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

router.post("/create", verifyUser, createListing);

export default router;
