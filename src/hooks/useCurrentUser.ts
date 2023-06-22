import { useLocalStorage } from "usehooks-ts";

type CurrentUser = {
  id: string;
  password: string;
  role: string;
  username: string;
};

export const useCurrentUser = () => {
  return useLocalStorage<CurrentUser | null>("currentUser", null);
};
