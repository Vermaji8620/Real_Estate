import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Listing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    // niche me jo imageUrls hai iska yeh matlab nahi hai ki sirf images hi store hongi isme...yaha pe jo bhi data hai wo store hoga...yaha pe imageUrls ka name isiliye rakha hai taki confusion na ho ki yeh kya ha...yeh toh bas ek name hai...yaha pe jo bhi data hai wo store hoga jaise ki name, description, address, sale, rent, parking, furnished, offer, bedrooms, bathrooms, regularPrice, discountPrice, imageUrls etc ...
    imageUrls: [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);
  console.log(files);

  const handleImageSubmit = async (e) => {
    console.log("fir7st");
    e.preventDefault();
    if (files.length == 0 || files.length + formData.imageUrls.length > 7) {
      setImageUploadError(
        "number of images should be less than or equal to 7 total items"
      );
      return;
    }
    console.log("third");
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
    console.log("dfdsfsf");
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, item) => item !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="3xl font-semibold text-center my-7">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </form>
    </main>
  );
};

export default Listing;
