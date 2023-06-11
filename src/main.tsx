import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookDetails from "./templates/BookDetails";
import Homepage from "./templates/Homepage";
import UsersManagement from "./templates/UsersManagement";
import BookManagementView from "./templates/BookManagement";
import LoginPage from "./templates/Login";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/books/:bookId",
    element: <BookDetails />,
  },
  {
    path: "/users",
    element: <UsersManagement />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/books",
    element: <BookManagementView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
