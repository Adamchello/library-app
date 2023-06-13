import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import styles from "./styles.module.css";
import { useBooks } from "../../hooks/useBooks";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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
  { Header: "Description", accessor: "description" },
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
  const [currentUser] = useCurrentUser();
  const [books, setBooks] = useBooks();
  const navigate = useNavigate();

  useEffect(() => {
    const isPermitted =
      currentUser.role === "admin" || currentUser.role === "librarian";
    if (!isPermitted) navigate("/");
  }, [currentUser]);

  const addBook = (data: Omit<Book, "id">) => {
    setIsModalOpen(false);
    const newBook = { ...data, id: uuidv4() };
    setBooks([...books, newBook]);
  };

  const deleteBook = (bookToDelete: Book) => {
    setBooks(books.filter((book) => book.id !== bookToDelete.id));
  };

  const editBook = (bookToEdit: Book) => {
    setBooks(
      books.map((book) => (book.id === bookToEdit.id ? bookToEdit : book))
    );
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: books });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Book</button>
      <table {...getTableProps()} className={styles.book_table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>Edit</th>
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
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                <td>
                  <button
                    className={styles.delete_button}
                    onClick={() => setChosenBookId(rowValues.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
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
        </tbody>
      </table>
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
    </div>
  );
};

export default BookManagementView;
