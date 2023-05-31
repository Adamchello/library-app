import { Link } from "react-router-dom";
import { useTable } from "react-table";
import styles from "./styles.module.css";

const data = [
  { username: "user1", role: "customer" },
  { username: "user2", role: "librarian" },
  { username: "user3", role: "customer" },
  { username: "user4", role: "customer" },
  { username: "user5", role: "admin" },
];

const columns = [
  { Header: "Username", accessor: "username" },
  { Header: "Role", accessor: "role" },
] as const;

const UsersManagement = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin User Management</h1>
      <Link to="/addUser" className={styles.addButton}>
        Add User
      </Link>
      <table className={styles.table} {...getTableProps()}>
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
                    to={`/editUser/${row.values.username}`}
                    className={styles.link}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button className={styles.button}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
