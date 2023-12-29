import { FaSearch } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // niche wala code sab se url ka andar search apne ap add ho jayega---
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // ab jo v term url pe hit marenge search krne ke liye wo yaha, input:search pe v aana chahieye,to iske liye useffect ka use krenge
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-font text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 flex items-center rounded-lg "
        >
          <input
            type="text"
            className="focus:outline-none bg-transparent w-24"
            name=""
            id=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search..."
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {/* yaha pe hm profile page pe leke jane ki kosis krrhe hai........ye jayega to ...but agr curentuser hga mere lcs me to profile pe redirect krne se chala jayega...(privateroute me jake check krega ki curentuser h ki nai hai..agr hai to profile page pe bhej dega nai to sign-in page pe bhj dega )  */}
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className="rounded-full h-7 w-7 object-cover"
                alt="profile"
              />
            ) : (
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
