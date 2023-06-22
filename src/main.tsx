import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./templates/Homepage";
import UsersManagement from "./templates/UsersManagement";
import BookManagementView from "./templates/BookManagement";
import LoginPage from "./templates/Login";
import "./index.css";
import BookPage from "./components/BookPage";

const book = {
  title: "Life of Pi",
  author: "Yann Martel",
  coverImageUrl:
    "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320562005l/4214.jpg",
  description:
    'Life of Pi is a fantasy adventure novel by Yann Martel published in 2001. The protagonist, Piscine Molitor "Pi" Patel, a Tamil boy from Pondicherry, explores issues of spirituality and practicality from an early age. He survives 227 days after a shipwreck while stranded on a lifeboat in the Pacific Ocean with a Bengal tiger named Richard Parker.',
  authorBio:
    "Yann Martel is the author of Life of Pi, the global bestseller that won the 2002 Man Booker Prize, among other prizes, and was adapted to an Oscar-winning film by Ang Lee. He is also the author of the novels Self, Beatrice and Virgil, and The High Mountains of Portugal, and a collection of stories, The Facts Behind the Helsinki Roccamatios.",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/books/:bookId",
    element: (
      <BookPage
        title={book.title}
        author={book.author}
        coverImageUrl={book.coverImageUrl}
        description={book.description}
        authorBio={book.authorBio}
      />
    ),
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
