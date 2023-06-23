import { useLocalStorage } from "usehooks-ts";

export const useItemsHistory = () => {
  const [history, setHistory] = useLocalStorage<
    { bookId: string; userId: string; action: string }[]
  >("history", []);

  const addToHistory = (data: {
    bookId: string;
    userId: string;
    action: string;
  }) => {
    setHistory((prev) => [...prev, data]);
  };

  return [history, addToHistory] as const;
};
