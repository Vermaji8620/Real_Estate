import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // yaha pe batana hoga ki hm dukan ko set up krrhe hai...to Provider k andar me dukan ko wrap up krna hoga
  <Provider store={store}>
    <App />
  </Provider>
);
