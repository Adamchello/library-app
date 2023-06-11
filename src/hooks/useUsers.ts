import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";

const data = [
  { id: uuidv4(), username: "user5", password: "example1", role: "admin" },
  { id: uuidv4(), username: "user2", password: "example1", role: "librarian" },
  { id: uuidv4(), username: "user1", password: "example1", role: "customer" },
  { id: uuidv4(), username: "user3", password: "example1", role: "customer" },
  { id: uuidv4(), username: "user4", password: "example1", role: "customer" },
];

export const useUsers = () => {
  return useLocalStorage("users", data);
};
