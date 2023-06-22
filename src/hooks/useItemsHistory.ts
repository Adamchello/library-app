import { useBooks } from "./useBooks";
import { useUsers } from "./useUsers";

export const useItemsHistory = () => {
  const [_, setBooks] = useBooks();
  const [__, setUsers] = useUsers();

  const updateBookHistory = ({
    bookId,
    userId,
    action,
  }: {
    bookId: string;
    userId: string;
    action: string;
  }) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id !== bookId) return book;

        return {
          ...book,
          history: [...(book?.history || []), { action, userId }],
        };
      })
    );
  };

  const updateUserHistory = ({
    bookId,
    userId,
    action,
  }: {
    bookId: string;
    userId: string;
    action: string;
  }) => {
    setUsers((users) =>
      users.map((user) => {
        if (user.id !== userId) return user;

        return {
          ...user,
          history: [...(user?.history || []), { action, bookId }],
        };
      })
    );
  };

  return { updateBookHistory, updateUserHistory };
};
