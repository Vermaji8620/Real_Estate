const Listing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="3xl font-semibold text-center my-7">Create a Listing</h1>
      <form onSubmit={""} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name=""
            placeholder="enter the name"
            className="p-3 rounded-lg border"
            id="name"
            maxLength="16"
            minLength="10"
            required
          />
          <input
            type="text"
            name=""
            placeholder="enter the description"
            className="p-3 rounded-lg border"
            id="description"
            required
          />
          <input
            type="text"
            name=""
            placeholder="enter the address"
            className="p-3 rounded-lg border"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-3">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" id="parking" className="w-5" />
              <span>parkingspot</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>furnished</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                required
                id="bedrooms"
                min="1"
                className="p-3 border border-gray-300 rounded-lg "
                max="10"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                required
                id="bathrooms"
                min="1"
                className="p-3 border border-gray-300 rounded-lg "
                max="10"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                required
                id="regularPrice"
                min="1"
                className="p-3 border border-gray-300 rounded-lg "
                max="10"
              />
              <div className="flex flex-col items-center">
                <p>RegularPrice</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                required
                id="discountPrice"
                min="1"
                className="p-3 border border-gray-300 rounded-lg "
                max="10"
              />
              <div className="flex flex-col items-center">
                <p>DicountPrice</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              First Image will be a cover (max-6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default Listing;
