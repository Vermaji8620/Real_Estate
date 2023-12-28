import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [file, setFile] = useState(undefined);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        console.log("file percentage is ---->", filePerc);
      },
      (error) => {
        setFileUploadError(true);
        console.log(fileUploadError);
        console.log("error is ---->", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          console.log("downloadURL --->", downloadURL);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data) {
        return dispatch(updateUserFailure(data.message));
      }
      dispatch(updateUserSuccess(data.user));
      navigate("/");
    } catch (error) {
      return dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data) return dispatch(deleteUserFailure(data.message));

      dispatch(deleteUserSuccess());
      // agar user delete ho jaye to logout apne aap ho jayega aur login page pe chala jayega
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "GET",
      });
      const dataa = await res.json();
      if (!dataa) return dispatch(signOutUserFailure("something went wrong"));
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!data) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
      console.log(error.message);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data) {
        console.log(data);
        return;
      }

      setUserListings((prev) =>
        prev.filter((element) => element._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 border text-center border-red-400">
        Profile
      </h1>
      <form
        className="flex flex-col border gap-4 border-green-600"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="file"
          id="file"
          // hm chah rahe hai ki [input type:file] ka functionality image ka andar me aa jaye...matlab ki image ko jo select krne ka funcitonality iske andar me hota hai wo image ko click krne se hone lage...(useRef hook ka use krna hoga iske liye. jisko initialise krna hga ek instance banake jo pehle kr chuke hai)
          ref={fileRef}
          hidden
          onChange={(e) => {
            // usestate hook ka use krke,,,,  ek variable(file) k andar me file ko le liye hai...
            setFile(e.target.files[0]);
          }}
          accept="image/*"
        />
        <img
          // aur us functionality ka referece hm is image me dal diye hai---(useRef hook ka use krna hoga iske liye. jisko initialise krna hga ek instance banake jo pehle kr chuke hai)
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border border-red-600 "
          alt="profile"
        />
        <p className="flex justify-center">
          {fileUploadError ? (
            <span className="text-red-500">
              Error image upload(image should be less than 2mb){" "}
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700 font-semibold">
              Uploading ---- {filePerc}
            </span>
          ) : filePerc == 100 ? (
            <span className="text-slate-700 font-semibold">
              File uploaded successfully
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          name="username"
          defaultValue={currentUser.username}
          id="username"
          autoComplete="username"
          placeholder="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          name="email"
          id="email"
          autoComplete="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          // jb loading true ho to button disable ho jaye
          disabled={loading}
          className="text-white rounded-lg bg-slate-700 p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <Link
        to={"/create-listing"}
        className="flex justify-center hover:opacity-95 w-full font-semibold uppercase mt-4 p-2 text-white bg-green-600 rounded-lg"
      >
        Create Listing
      </Link>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      <button className="w-full" onClick={handleShowListings}>
        <p className="text-red-700">
          {showListingsError ? (
            <div className="text-red-700 font-semibold">
              Error Showing Listings
            </div>
          ) : (
            <div className="text-green-700 font-semibold">Show Listings</div>
          )}
        </p>
      </button>

      {userListings && userListings.length > 0 ? (
        <div className="border border-red-700 flex flex-col justify-center">
          <h2 className="text-center font-bold text-2xl">Your Listings</h2>
          {userListings.map((listing, index) => (
            <div key={index} className="flex justify-between items-center mt-3">
              <Link to={`/listing/${listing._id}`}>
                <p>
                  <img
                    src={listing.imageUrls}
                    className="h-16 w-16 object-contain"
                    alt="this is one of the images"
                  />
                </p>
              </Link>
              {/* truncate ka matlab hai ki nam agar boht lamba raha to dotdotdot(...) kr dega */}
              <Link to={`/listing/${listing._id}`}>
                <p className="text-slate-700 font-semibold hover:underline truncate">
                  {listing.name}
                </p>
              </Link>

              <p className="flex flex-col justify-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </p>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
