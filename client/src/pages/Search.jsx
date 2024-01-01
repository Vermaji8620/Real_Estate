const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              name=""
              id="searchTerm "
              placeholder="Search"
              className="border w-full  rounded-lg p-3 w-4"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Type</label>
            <div className="flex gap-2">
              <input type="checkbox" name="" className="w-5" id="all" />
              <span>Rent & sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" className="w-5" id="sale" />
              <span> sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Amenities</label>
            <div className="flex gap-2">
              <input type="checkbox" name="" className="w-5" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" className="w-5" id="furnished" />
              <span>furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="">Sort:</label>
            <select name="" id="sort_order" className="border rounded-lg p-3">
              <option value="">Price High To Low</option>
              <option value="">Price Low To High</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
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
