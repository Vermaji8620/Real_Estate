import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" md:mx-auto md:w-[40%] p-10 ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="enter the username"
          className=" p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="enter the email"
          className=" p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="enter the password"
          className=" p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign-Up
        </button>
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
