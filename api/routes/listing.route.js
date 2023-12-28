import express from "express";
const router = express.Router();
import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);

export default router;
