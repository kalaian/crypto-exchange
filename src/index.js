import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./app/store";
import CryptoExchange from "./features/exchange/CryptoExchange";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      style={{ width: "500px" }}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      theme="colored"
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <CryptoExchange />
  </Provider>
);

reportWebVitals();
