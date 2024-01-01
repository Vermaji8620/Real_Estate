import PropTypes from "prop-types";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`}>
      <div className="bg-white shadow-md border border-green-500 overflow-hidden rounded-lg w-full sm:w-[330px] hover:shadow-lg transition-shadow">
        <img
          src={
            listing.imageUrls[0]
              ? listing.imageUrls[0]
              : `https://www.shutterstock.com/image-photo/property-taxes-real-estate-market-260nw-1700575657.jpg`
          }
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          alt=""
        />
        <div className="p-3 flex border border-red-600 flex-col gap-2">
          {/* truncate only works if width is set */}
          <p className="text-lg font-semibold uppercase truncate text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-3">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-slate-700 truncate">{listing.address}</p>
          </div>
          <p className="truncate text-gray-700">{listing.description}</p>
          <p className="mt-2 font-semibold">
            $
            {listing.offer
              ? listing.regularPrice.toLocaleString() -
                listing.discountedPrice.toLocaleString()
              : listing.regularPrice.toLocaleString()}
            {listing.type === "rent" ? `/month` : ""}
          </p>
          <div className="flex gap-3 font-bold">
            <div>
              {listing.bedrooms} {listing.bedrooms > 1 ? "bedrooms" : "bedroom"}
            </div>
            <div>
              {listing.bathrooms}
              {listing.bathrooms > 1 ? "bathrooms" : "bathroom"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingItem;
