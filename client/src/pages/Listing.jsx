import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorHandler } from "../../../api/utils/error";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { FaBed } from "react-icons/fa6";
import { LiaBathSolid } from "react-icons/lia";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Contact from "../components/Contact";

const Listing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const listingId = params.listingId;
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (!data) {
          setLoading(false);
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setLoading("yeh error a rha hai", false);
        setError(true);
        errorHandler(404, "could not fetch the data");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <main>
        {loading && <p className="text-center mt-6">...Loading</p>}
        {error && <p className="text-center mt-6">...Something went wrong</p>}
        {/* {listing.name} */}
        {listing && !loading && !error && (
          <div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 1,
                },
              }}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {listing.imageUrls.map((image, index) => (
                <div key={index}>
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt="this is the image"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        )}
      </main>
      {listing && !loading && !error && (
        <div className=" flex flex-col gap-6 -red-900 mt-10 w-[80%] mx-auto">
          <div className=" flex sm:w-[40%] font-bold justify-between">
            <div className="uppercase">{listing.name}</div>
            <div>${listing.regularPrice}/month</div>
          </div>
          <div className="flex gap-6">
            <div>
              <button className="bg-red-700 text-white rounded-md p-2">
                For {listing.type}
              </button>
            </div>
            <div>
              <button className="bg-green-700 text-white rounded-md p-2">
                ${+listing.regularPrice - +listing.discountedPrice}
              </button>
            </div>
          </div>
          <div>
            <span className="font-bold">Description :-- </span>
            {listing.description}
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex">
              <FaBed />
              {listing.bedrooms} bed
            </div>
            <div className="flex">
              <LiaBathSolid />
              {listing.bathrooms} bath
            </div>
            <div className="flex">
              <FaParking />
              {listing.parking ? <div>Parking</div> : <div>No Parking</div>}
            </div>
            <div className="flex">
              <FaChair />
              {listing.furnished ? (
                <div>Furnished</div>
              ) : (
                <div>Not Furnished</div>
              )}
            </div>
          </div>

          {/* current user ka condition isilite rakhe hai isme taki samjh me aye ki user loggedin hai tabhi usko contact waala button dikhega....aur user ab khud ko hi thode na contact krega ..to  agr listing ka userRef curentUser ka id k NOT EQUAL HAI TO contact ka button dikhayenge */}
          {currentUser && currentUser._id !== listing.userRef && !contact && (
            <button
              onClick={() => {
                setContact(true);
              }}
              className="text-white rounded-md p-2 uppercase font-bold bg-slate-700 w-full "
            >
              Contact Landlord
            </button>
          )}
          {contact && <Contact listing={listing} />}
        </div>
      )}
    </div>
  );
};

export default Listing;
