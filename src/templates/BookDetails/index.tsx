import { useBooks } from "../../hooks/useBooks";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useItemsHistory } from "../../hooks/useItemsHistory";
import styles from "./styles.module.css";
import Button from "../../components/Button";

const BookPage = () => {
  const [books, setBooks] = useBooks();
  const [currentUser] = useCurrentUser();
  const [_, addToHistory] = useItemsHistory();
  const location = useLocation();

  const bookId = location.pathname.replace("/books/", "");
  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) return null;

  const canReserveBook =
    foundBook.status === "available" &&
    currentUser !== null &&
    currentUser.role === "customer";

  const handleReserve = () => {
    if (!canReserveBook) return;

    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id !== foundBook.id) return book;
        const prevHistory = book?.history || [];

        return {
          ...book,
          status: "reserved",
          history: [
            ...prevHistory,
            { action: "reserved", userId: currentUser.id },
          ],
        };
      })
    );

    addToHistory({
      userId: currentUser.id,
      bookId: foundBook.id,
      action: "reservation",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookInfo}>
        <img
          className={styles.bookCover}
          src={foundBook.image}
          alt={`${foundBook.title} book cover`}
        />
        <h1 className={styles.bookTitle}>{foundBook.title}</h1>
        <h2 className={styles.bookAuthor}>by {foundBook.author}</h2>
        <p className={styles.bookDescription}>{foundBook.description}</p>
        {!canReserveBook && (
          <strong>
            Only logged in users with role customer can reserve book
          </strong>
        )}
        <Button
          disabled={!canReserveBook || foundBook.status === "reserved"}
          onClick={handleReserve}
          label="Reserve"
        />
      </div>
    </div>
  );
};

export default BookPage;
