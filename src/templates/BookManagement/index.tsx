import { Link } from "react-router-dom";
import { useTable } from "react-table";
import styles from "./styles.module.css";

const data = [
  {
    title: "Book1",
    author: "Author1",
    genre: "Genre1",
    year: "2000",
    status: "Available",
    image: "https://via.placeholder.com/100",
  },
  {
    title: "Book2",
    author: "Author2",
    genre: "Genre2",
    year: "2001",
    status: "Borrowed",
    image: "https://via.placeholder.com/100",
  },
  {
    title: "Book3",
    author: "Author3",
    genre: "Genre3",
    year: "2002",
    status: "Available",
    image: "https://via.placeholder.com/100",
  },
  {
    title: "Book4",
    author: "Author4",
    genre: "Genre4",
    year: "2003",
    status: "Borrowed",
    image: "https://via.placeholder.com/100",
  },
];

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
  { Header: "Genre", accessor: "genre" },
  { Header: "Year", accessor: "year" },
  { Header: "Status", accessor: "status" },
] as const;

const BookManagementView = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Management</h1>
      <Link className={styles.link} to="/addBook">
        Add Book
      </Link>
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
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                <td>
                  <Link
                    className={styles.link}
                    to={`/editBook/${row.values.title}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button className={styles.delete_button}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookManagementView;
