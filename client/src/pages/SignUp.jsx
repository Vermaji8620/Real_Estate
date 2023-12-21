import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (res.ok) {
        const responseData = await res.json();
        navigate("/sign-in");
        console.log(responseData);
      } else {
        setError(error);
        setLoading(false);
        document.querySelector(".form").reset();
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      document.querySelector(".form").reset();
    }
  };
  return (
    <div className=" md:mx-auto md:w-[40%] p-10 ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="enter the username"
          className=" p-3 rounded-lg"
          autoComplete="username"
          id="username"
        />
        <input
          onChange={handleChange}
          type="email"
          autoComplete="email"
          placeholder="enter the email"
          className=" p-3 rounded-lg"
          id="email"
        />
        <input
          onChange={handleChange}
          type="password"
          autoComplete="current-password"
          placeholder="enter the password"
          className=" p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign-Up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>
          Have an account?
          <Link to={"/sign-in"}>
            <span className="text-blue-700 ">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
