const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-b-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap">Search Term</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2">
            <label>Type:</label>
            <div className="flex gap-2">
              {/* id all hai kyunki rent and sale dono consider krnege yaha pe */}
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent and Sale</span>
            </div>
            <div className="flex gap-2">
              {/* id all hai kyunki rent and sale dono consider krnege yaha pe */}
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent </span>
            </div>
            <div className="flex gap-2">
              {/* id all hai kyunki rent and sale dono consider krnege yaha pe */}
              <input type="checkbox" id="sale" className="w-5" />
              <span> Sale</span>
            </div>
            <div className="flex gap-2">
              {/* id all hai kyunki rent and sale dono consider krnege yaha pe */}
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2">
            <label>Amenties:</label>
            <div className="flex gap-2">
              {/* id all hai kyunki rent and sale dono consider krnege yaha pe */}
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              {/* id all hai kyunki rent and sale dono consider krnege yaha pe */}
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label>Sort: </label>
            <select name="" id="sort_order" className="border rounded-lg p-2">
              <option value="">Price High to low</option>
              <option value="">Price Low to High</option>
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
        <h1 className="text-3xl font-semibold p-3 text-slate-700 border-b-2">
          Listing Results
        </h1>
      </div>
    </div>
  );
};

export default Search;
