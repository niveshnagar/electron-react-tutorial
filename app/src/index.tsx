import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import App from "./App";
import Work from "./pages/Work";
import Mock from "./pages/Mock";
import Counter from "./pages/Counter";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: [<App />],
      },
      {
        path: "/work",
        element: <Work />,
      },
      {
        path: "/multiplier",
        element: <Mock />,
      },
      {
        path: "/counter",
        element: <Counter />,
      },
    ],
    // errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={appRouter} />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
