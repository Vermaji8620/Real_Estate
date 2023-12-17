import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 border text-center border-red-400">
        Profile
      </h1>
      <form className="flex flex-col border gap-4 border-green-600">
        <img
          src={currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border border-red-600 "
          alt="profile"
        />
        <input
          type="text"
          name=""
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          id=""
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button className="text-white rounded-lg bg-slate-700 p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
