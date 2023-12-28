import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const Listing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // niche me jo imageUrls hai iska yeh matlab nahi hai ki sirf images hi store hongi isme...yaha pe jo bhi data hai wo store hoga...yaha pe imageUrls ka name isiliye rakha hai taki confusion na ho ki yeh kya ha...yeh toh bas ek name hai...yaha pe jo bhi data hai wo store hoga jaise ki name, description, address, sale, rent, parking, furnished, offer, bedrooms, bathrooms, regularPrice, discountPrice, imageUrls etc ...
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    // userRef
  });

  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);
  console.log(files);

  // niche ka pehla teen function image upload ke liye hai aur beech ka ek function handlechange k liye hai aur  niche ka last function form submit ke liye hai
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (files.length == 0 || files.length + formData.imageUrls.length > 7) {
      setImageUploadError(
        "number of images should be less than or equal to 7 total items"
      );
      return;
    }
    let promises = []; //array of promises to store all the files

    for (let i = 0; i < files.length; i++) {
      promises.push(storeImage(files[i]));
    }

    //  niche wala Promise ka yeh matlb hai ki jab tak sare promises resolve nahi ho jate tab tak Promise.all() ka then() chalega....yani ki jab tak sare images upload nahi ho jati tab tak imageUrls state update nahi hoga aur jab sare images upload ho jayengi tab imageUrls state update ho jayega.....iska yeh matlab hi ki jab tak imageUrls state update nahi hota tab tak form submit nahi hoga aur jab imageUrls state update ho jayega tab form submit ho jayega

    try {
      // Promise.all() method returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects.
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData, //yaha pe ...formData isiliye kiya hai taki jo bhi pehle se formData state mei data hai wo bhi wahi rahe aur imageUrls state mei jo bhi data hai wo bhi wahi rahe
          imageUrls: formData.imageUrls.concat(urls), //concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
        });
      });
      setImageUploadError(false);
    } catch (err) {
      console.log("eror while updating the formData is ", err);
    }
  };

  const storeImage = async (eachfile) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = new Date().getTime() + "-" + eachfile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, eachfile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) =>
            resolve(getDownloadURL)
          );
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, item) => item !== index),
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "sale" || e.target.id == "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === "number" || e.target.type === "text") {
      setFormData({
        ...formData,
        // niche me bada bracket isiliye add krte hai taki jo bhi id hai wo variable ki tarah use ho jaye... jaise example ke liye agar niche me id="name" hai toh yeh name variable ki tarah use ho jayega aur agar niche me id='description' hai to yeh description variable ki tarah use ho jayega
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1)
      return setError("you must upload atleast one image");
    if (formData.regularPrice < formData.discountedPrice)
      return setError("discounted price must be less than the regular price");
    try {
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      if (!data) {
        setError(data.message);
        console.log(data.message);
        return;
      }
      console.log("data yeh hai", data);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      console.log("error while creating the listing is ", error);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="3xl font-semibold text-center my-7">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
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
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            name=""
            placeholder="enter the description"
            className="p-3 rounded-lg border"
            id="description"
            onChange={handleChange}
            value={formData.description}
            required
          />
          <input
            type="text"
            name=""
            placeholder="enter the address"
            className="p-3 rounded-lg border"
            id="address"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type == "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type == "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>parkingspot</span>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>furnished</span>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                required
                id="bedrooms"
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
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
                onChange={handleChange}
                value={formData.regularPrice}
                min="1"
                className="p-3 border border-gray-300 rounded-lg "
                max="1000000"
              />
              <div className="flex flex-col items-center">
                <p>RegularPrice</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {
              // niche wala div tabhi show hoga jab offer checkbox checked hoga
              formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    required
                    id="discountedPrice"
                    onChange={handleChange}
                    value={formData.discountedPrice}
                    min="0"
                    className="p-3 border border-gray-300 rounded-lg "
                    max="1000"
                  />
                  <div className="flex flex-col items-center">
                    <p>DicountPrice</p>
                    <span className="text-xs">($ / month)</span>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              First Image will be a cover (max-6)
            </span>
          </p>
          <div className=" flex gap-4 border border-red-600">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name=""
              onChange={(e) => setFiles(e.target.files)}
              id="images"
              accept="image/*"
              multiple
            />
            <button
              className="p-3 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              // type button isiliye kiya hai taki form submit na ho jaye...to aisa kr dene se form submit nhi hoga
              type="button"
              onClick={handleImageSubmit}
            >
              Upload
            </button>
          </div>
          <div className="border border-red-400 flex flex-wrap gap-6">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div key={index} className="flex flex-col">
                  <div>
                    <img src={url} alt="" className="w-20 h-20" />;
                  </div>
                  <button
                    type="button"
                    // niche me callback function isiliye de rahe hai taki jab delete button pe click karenge tabhi image delete ho aur agar hum direct handleRemoveImage(index) likhte toh wo function call ho jayega aur sare images delete ho jayegnegi ...  aur ek reason hai ki complexity agar zyada hai to hum callback function use karte hai aur agar complexity kam hai to hum direct function call karte hai....yaha pe complexity zyada hai isiliye hum callback function use kar rahe hai
                    onClick={() => handleRemoveImage(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

          <p className="text-red-600 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
          {error ? <div className="text-red-700 ">{error}</div> : <div>{}</div>}
        </div>
      </form>
    </main>
  );
};

export default Listing;
