import { Listing } from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "no such listing"));
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "you can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const find = await Listing.findById(req.params.id);
  if (!find) return next(errorHandler(404, "no such listing available"));

  if (req.user.id !== find.userRef)
    return next(errorHandler(401, "you can just delete your own listing "));

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(401, "Listing not found"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// search karne ka logic hai ki agar koi user search karega to uske search ke hisab se usko listing dikhayi degi
// Listing ka andar me jitna v items hai jo Schema k time pe define kiye the, unko hi hum query mei use kr skte hai
export const getListings = async (req, res, next) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    let startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;

    if (offer == undefined || offer == "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished == undefined || furnished == "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking == undefined || parking == "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type == undefined || type == "all") {
      type = { $in: ["sale", "rent"] };
    }

    let searchTerm = req.query.searchTerm || "";

    let sort = req.query.sort || "createdAt";

    let order = req.query.order || "desc";

    let listings = await Listing.find({
      // searchTerm jo hai wo name hai jo query mei aya hai aur i matlab case INSENSITIVE hai, searchTerm se ham listing ka name me search kr skte hai...
      // aur regex inbuilt function hai jo ki string mei search krta hai---
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);

    console.log(listings);
    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
