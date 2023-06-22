import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import styles from "./styles.module.css";
import { useBooks } from "../../hooks/useBooks";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useItemsHistory } from "../../hooks/useItemsHistory";

const columns = [
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ value }: { value: string }) => (
      <img src={value} alt="book" style={{ width: "50px", height: "50px" }} />
    ),
  },
  { Header: "Title", accessor: "title" },
  { Header: "Author", accessor: "author" },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ value }: { value: string }) => <p>{`${value.slice(0, 50)}...`}</p>,
  },
  { Header: "Status", accessor: "status" },
] as const;

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  status: string;
  image: string;
};

const BookManagementView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenBookId, setChosenBookId] = useState("");
  const { updateBookHistory, updateUserHistory } = useItemsHistory();
  const [currentUser] = useCurrentUser();
  const [books, setBooks] = useBooks();
  const navigate = useNavigate();

  useEffect(() => {
    const isForbidden = currentUser === null || currentUser.role === "customer";

    if (isForbidden) navigate("/");
  }, [currentUser]);

  const addBook = (data: Omit<Book, "id">) => {
    if (!currentUser) return;

    setIsModalOpen(false);

    const newBook = {
      ...data,
      history: [{ action: "created", userId: currentUser.id }],
      id: uuidv4(),
    };

    setBooks([...books, newBook]);

    updateUserHistory({
      action: "created book",
      userId: currentUser.id,
      bookId: newBook.id,
    });
  };

  const deleteBook = (bookToDelete: Book) => {
    setBooks(books.filter((book) => book.id !== bookToDelete.id));
  };

  const editBook = (bookToEdit: Book) => {
    if (!currentUser) return;

    setBooks(
      books.map((book) => (book.id === bookToEdit.id ? bookToEdit : book))
    );

    updateBookHistory({
      action: "edit",
      userId: currentUser.id,
      bookId: bookToEdit.id,
    });

    updateUserHistory({
      action: "edited book",
      userId: currentUser.id,
      bookId: bookToEdit.id,
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: books });

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Book Management</h1>
        <table {...getTableProps()} className={styles.book_table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
                <th>View</th>
                <th>Edit</th>
                <th>History</th>
                <th>Delete</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const rowValues = row.original as Book;

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      data-label={cell.column.Header}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td data-label="View">
                    <Link
                      className={styles.delete_button}
                      to={`/books/${rowValues.id}`}
                    >
                      View
                    </Link>
                  </td>
                  <td data-label="Edit">
                    <button
                      className={styles.delete_button}
                      onClick={() => setChosenBookId(rowValues.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td data-label="History">
                    <button
                      className={styles.delete_button}
                      onClick={() => setChosenBookId(rowValues.id)}
                    >
                      History
                    </button>
                  </td>
                  <td data-label="Delete">
                    <button
                      className={styles.delete_button}
                      onClick={() => deleteBook(rowValues)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr className={styles.addBookRow}>
              <td colSpan={headerGroups[0].headers.length + 3}>
                <button
                  className={styles.addButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add New Book
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddBookModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        addBook={addBook}
      />
      <EditBookModal
        chosenBookId={chosenBookId}
        closeModal={() => setChosenBookId("")}
        editBook={editBook}
      />
    </>
  );
};

export default BookManagementView;
