import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          {/* profile page ko cover kr de rhe hai....provateroute se....jb v profile pe jana chahega...pehle to usko privateroute check krne hga */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<Listing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
