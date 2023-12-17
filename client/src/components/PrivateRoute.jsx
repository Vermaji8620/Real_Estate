import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  // outlet is used for the children
  // yaha pe privateRoute check krrha hai...ki agr curentuser hai to profile pe bhej do nai to sign-in pe bhej do
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
