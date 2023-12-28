import express from "express";
const router = express.Router();
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.put("/update/:id", verifyUser, updateListing);
router.get("/get/:id", getListing);

export default router;
