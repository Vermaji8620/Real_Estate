import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorHandler } from "../../../api/utils/error";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Listing = () => {
  // SwiperCore.use(Navigation);
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
        console.log(listing);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
        errorHandler(404, "could not fetch the data");
      }
    })();
  }, []);

  return (
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
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {listing.imageUrls.map((image, index) => (
              <div key={image ? image._id : index}>
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt="this is the image"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
