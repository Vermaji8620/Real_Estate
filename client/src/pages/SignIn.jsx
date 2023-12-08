import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
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
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const responseData = await res.json();
        navigate("/");
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
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4 form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          placeholder="enter the email"
          className=" p-3 rounded-lg"
          id="email"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="enter the password"
          className=" p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign-In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>
          Dont have an account?
          <Link to={"/sign-up"}>
            <span className="text-blue-700 ">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
