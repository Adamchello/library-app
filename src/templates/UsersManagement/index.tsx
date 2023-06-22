import { useEffect, useState } from "react";
import { useTable } from "react-table";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import AddUserModal from "./AddUserModal";
import { useUsers } from "../../hooks/useUsers";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";

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
  const [users, setUsers] = useUsers();
  const [currentUser] = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) => user.role !== "admin");

  useEffect(() => {
    const isAccessForbidden =
      currentUser === null || currentUser.role !== "admin";
    if (isAccessForbidden) navigate("/");
  }, [currentUser]);

  const addUser = (data: Omit<User, "id">) => {
    setIsModalOpen(false);
    const foundUser = users.find((user) => user.username === data.username);
    if (foundUser) {
      alert("user with this username already exists");
      return;
    }

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
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Admin User Management</h1>
        <table className={styles.table} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
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
                    <td
                      {...cell.getCellProps()}
                      data-label={cell.column.Header}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td data-label="Delete">
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
            <tr className={styles.addUserRow}>
              <td colSpan={headerGroups[0].headers.length + 1}>
                <button
                  className={styles.addButton}
                  onClick={() => openModal()}
                >
                  Add New User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddUserModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        addUser={addUser}
      />
    </>
  );
};

export default UsersManagement;
