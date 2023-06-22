import styled from "@emotion/styled";
import { useBooks } from "../../hooks/useBooks";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useItemsHistory } from "../../hooks/useItemsHistory";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BookCover = styled.img`
  width: 100%;
  max-width: 250px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const BookTitle = styled.h1`
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
`;

const BookAuthor = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
  color: grey;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const BookDescription = styled.p`
  text-align: justify;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ReserveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }

  &:disabled {
    background-color: #aaa;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    padding: 8px 16px;
  }
`;

const BookPage = () => {
  const [books, setBooks] = useBooks();
  const [currentUser] = useCurrentUser();
  const { updateBookHistory, updateUserHistory } = useItemsHistory();
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

        return {
          ...book,
          status: "reserved",
        };
      })
    );

    updateBookHistory({
      userId: currentUser.id,
      bookId: foundBook.id,
      action: "reservation",
    });

    updateUserHistory({
      userId: currentUser.id,
      bookId: foundBook.id,
      action: "reservation",
    });
  };

  return (
    <Container>
      <BookInfo>
        <BookCover
          src={foundBook.image}
          alt={`${foundBook.title} book cover`}
        />
        <BookTitle>{foundBook.title}</BookTitle>
        <BookAuthor>by {foundBook.author}</BookAuthor>
        <BookDescription>{foundBook.description}</BookDescription>
        {!canReserveBook && (
          <p>Only logged in users with role customer can reserve book</p>
        )}
        <ReserveButton
          disabled={!canReserveBook || foundBook.status === "reserved"}
          onClick={handleReserve}
        >
          Reserve
        </ReserveButton>
      </BookInfo>
    </Container>
  );
};

export default BookPage;
