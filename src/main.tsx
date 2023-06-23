import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./templates/Homepage";
import UsersManagement from "./templates/UsersManagement";
import BookManagementView from "./templates/BookManagement";
import LoginPage from "./templates/Login";
import BookDetails from "./templates/BookDetails";

import "./index.css";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Homepage />
      </Layout>
    ),
  },
  {
    path: "/books/:bookId",
    element: (
      <Layout>
        <BookDetails />
      </Layout>
    ),
  },
  {
    path: "/users",
    element: (
      <Layout>
        <UsersManagement />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <BookManagementView />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
