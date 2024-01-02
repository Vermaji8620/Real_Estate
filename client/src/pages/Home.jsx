// swiper component isme present hai---
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSale] = useState([]);
  SwiperCore.use([Navigation]);
  const [rentListings, setRent] = useState([]);
  console.log("offer hai ye", offerListings);
  console.log("sale ha ye", saleListings);
  console.log("rent hai ye", rentListings);

  useEffect(() => {
    (async () => {
      try {
        const resoffer = await fetch(`/api/listing/get?offer=true&limit=4`);
        const dataoffer = await resoffer.json();
        setOfferListings(dataoffer);
        (async () => {
          try {
            const restype = await fetch(`/api/listing/get?type=sale&limit=4`);
            const datatype = await restype.json();
            setSale(datatype);
            (async () => {
              try {
                //
                const saletype = await fetch(
                  `/api/listing/get?type=rent&limit=4`
                );
                const datasale = await saletype.json();
                setRent(datasale);
              } catch (error) {
                console.log("sale ka error a rha hai", error);
              }
            })();
          } catch (error) {
            console.log("rent ka error a rha hai", error);
          }
        })();
      } catch (error) {
        console.log("offer ka error a rha hai", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.reload]);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 max-w-6xl mx-auto px-3">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl ">
          Find your next <span className="text-slate-500">Perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Vermaji Estate is the best place to find your next perfect place to
          live. <br /> We have a wide range of properties for you to choose
          from.
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Lets gets started
        </Link>
      </div>

      {/* swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                key={listing._id}
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] "
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing result for offer sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent Offers
              </h2>
              <Link
                className="text:sm text-blue-800 hover:underline"
                to={`/search?offer=true`}
              >
                Show More Offers
              </Link>
            </div>
            <div className="flex md:flex-row md:flex-wrap flex-col gap-3">
              {offerListings.map((listing) => (
                <div key={listing._id}>
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent places for rent
              </h2>
              <Link
                className="text:sm text-blue-800 hover:underline"
                to={`/search?type=rent`}
              >
                Show More Places for rent
              </Link>
            </div>
            <div className="flex md:flex-row md:flex-wrap flex-col gap-3">
              {rentListings.map((listing) => (
                <div key={listing._id}>
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent places for sale
              </h2>
              <Link
                className="text:sm text-blue-800 hover:underline"
                to={`/search?type=sale`}
              >
                Show More places for sale
              </Link>
            </div>
            <div className="flex md:flex-row md:flex-wrap flex-col gap-3">
              {saleListings.map((listing) => (
                <div key={listing._id}>
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
