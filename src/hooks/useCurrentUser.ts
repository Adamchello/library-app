import { useLocalStorage } from "usehooks-ts";

export const useCurrentUser = () => {
  return useLocalStorage<{
    id?: string;
    password?: string;
    role?: string;
    username?: string;
  }>("currentUser", {});
};
