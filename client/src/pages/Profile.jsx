import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    setCount(count + 1);
    console.log(count);
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 border text-center border-red-400">
        Profile
      </h1>
      <form className="flex flex-col border gap-4 border-green-600">
        <input
          type="file"
          name=""
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
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
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
