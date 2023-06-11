import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useTable } from "react-table";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import AddUserModal from "./AddUserModal";

const data = [
  { id: uuidv4(), username: "user5", password: "example1", role: "admin" },
  { id: uuidv4(), username: "user2", password: "example1", role: "librarian" },
  { id: uuidv4(), username: "user1", password: "example1", role: "customer" },
  { id: uuidv4(), username: "user3", password: "example1", role: "customer" },
  { id: uuidv4(), username: "user4", password: "example1", role: "customer" },
];

const columns = [
  { Header: "Username", accessor: "username" },
  { Header: "Password", accessor: "password" },
  { Header: "Role", accessor: "role" },
] as const;

type User = {
  id: string;
  username: string;
  password: string;
  role: string;
};

const UsersManagement = () => {
  const [users, setUsers] = useLocalStorage("users", data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredUsers = users.filter((user) => user.role !== "admin");

  const addUser = (data: Omit<User, "id">) => {
    setIsModalOpen(false);
    const newUser = { ...data, id: uuidv4() };
    setUsers([...users, newUser]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteUser = (userToDelete: User) => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredUsers });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin User Management</h1>
      <button className={styles.addButton} onClick={() => openModal()}>
        Add User
      </button>
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>Delete</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const rowValues = row.original as User;

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                <td>
                  <button
                    className={styles.button}
                    onClick={() => deleteUser(rowValues)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AddUserModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        addUser={addUser}
      />
    </div>
  );
};

export default UsersManagement;
