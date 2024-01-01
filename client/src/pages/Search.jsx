import { useState } from "react";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  console.log(sidebarData);

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

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
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
      </div>
    </div>
  );
};

export default Search;
