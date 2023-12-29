import express from "express";
const router = express.Router();
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.put("/update/:id", verifyUser, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
