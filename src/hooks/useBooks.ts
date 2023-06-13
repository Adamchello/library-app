import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";

const data = [
  {
    id: uuidv4(),
    title: "Book1",
    author: "Author1",
    description: "Lorem",
    status: "available",
    image: "https://via.placeholder.com/100",
  },
  {
    id: uuidv4(),
    title: "Book2",
    author: "Author2",
    description: "Lorem",
    status: "borrowed",
    image: "https://via.placeholder.com/100",
  },
  {
    id: uuidv4(),
    title: "Book3",
    author: "Author3",
    description: "Lorem",
    status: "available",
    image: "https://via.placeholder.com/100",
  },
  {
    id: uuidv4(),
    title: "Book4",
    author: "Author4",
    description: "Lorem",
    status: "borrowed",
    image: "https://via.placeholder.com/100",
  },
];

export const useBooks = () => {
  return useLocalStorage("books", data);
};
