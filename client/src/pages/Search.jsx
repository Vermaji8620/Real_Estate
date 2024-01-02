import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [listings, setListings] = useState([]);

  console.log("yeh hai sidebar ka data---> ", sidebarData);
  console.log("yeh hai listings ka data---> ", listings);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({
        ...sidebarData,
        type: e.target.id,
      });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]: e.target.checked ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({
        ...sidebarData,
        sort: sort,
        order: order,
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    setSidebarData({
      ...sidebarData,
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      parking:
        parkingFromUrl === true || parkingFromUrl === "true" ? true : false, // yaha pe boolean aur string dono ke liye check krna padega...sirf boolean k liye chceck kare the toh error aa rha tha ...  upar me jo url se .get krke data nikal rahe hai, uska output k type ko jab console.log krrhe hai to string a raha hai
      // aur ye sb hm parking, furnished, aur offer teeno ke liye krrhe hai.........teeno k liye krna higa
      furnished:
        furnishedFromUrl === true || furnishedFromUrl === "true" ? true : false,
      offer: offerFromUrl === true || offerFromUrl === "true" ? true : false,
      sort: sortFromUrl || "created_at",
      order: orderFromUrl || "desc",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // yaha pe jb bhi form submit hoga toh yeh function chalega jo ki form ka jo v data hai wo url pe update krega aur phir useeffect chalega
    // pehle wo information chahiye jo ki already url pe hai
    // window.location.search inbuilt function hai jo ki url se query string nikal leta hai
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    (async () => {
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      try {
        if (data) {
          setListings(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              onChange={handleChange}
              value={sidebarData.searchTerm}
              name=""
              id="searchTerm"
              placeholder="Search"
              className="border w-full ounded-lg p-3"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Type</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                checked={sidebarData.type === "all"}
                onChange={handleChange}
                className="w-5"
                id="all"
              />
              <span>Rent & sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
                className="w-5"
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
                className="w-5"
                id="sale"
              />
              <span> sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                checked={sidebarData.offer}
                onChange={handleChange}
                className="w-5"
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Amenities</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                checked={sidebarData.parking}
                onChange={handleChange}
                className="w-5"
                id="parking"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                checked={sidebarData.furnished}
                onChange={handleChange}
                className="w-5"
                id="furnished"
              />
              <span>furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="">Sort:</label>
            <select
              name=""
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price High To Low</option>
              <option value="regularPrice_asc">Price Low To High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b-4 p-4 text-slate-700 mt-5">
          Listing Results:
        </h1>
        {listings.length > 0 && <div>Total {listings.length} Listings</div>}
        <div>
          {listings && listings.length === 0 && (
            <div className="text-4xl p-7 text-slate-700">No Listings Found</div>
          )}
          {listings && listings.length > 0 && (
            <div className="flex md:flex-row md:flex-wrap flex-col gap-10">
              {listings.map((listing, index) => (
                <div key={listing._id ? listing._id : index}>
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
