import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import config from "./aws-exports";
import Amplify from "@aws-amplify/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConfirmSignup from "./components/ConfirmSignup";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <App />
      </div>
    ),
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "signin",
    element: <SigninPage />,
  },
  {
    path: "confirm-email",
    element: <ConfirmSignup />,
  },
  {
    path: 'create',
    element: ''
  }
]);

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
