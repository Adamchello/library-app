import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
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

type FormValues = {
  username: string;
  password: string;
  role: string;
};

const initalState = { username: "", password: "", role: "" };

const UsersManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormValues>(initalState);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setIsModalOpen(false);
  };

  const openModal = (rowData: FormValues) => {
    setFormData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initalState);
    reset();
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin User Management</h1>
      <button
        className={styles.addButton}
        onClick={() => openModal(initalState)}
      >
        Add User
      </button>
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
                  <button
                    onClick={() =>
                      openModal({ ...row.values, password: "" } as FormValues)
                    }
                    className={styles.link}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className={styles.button}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Form"
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Edit User</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
            <div>
              <label className={styles.modalFormLabel}>Username</label>
              <input
                type="text"
                defaultValue={formData?.username}
                {...register("username", { required: true })}
                className={styles.modalFormInput}
              />
            </div>
            <div>
              <label className={styles.modalFormLabel}>Password</label>
              <input
                type="text"
                defaultValue={formData?.password}
                {...register("password", { required: true })}
                className={styles.modalFormInput}
              />
            </div>
            <div>
              <label className={styles.modalFormLabel}>Role</label>
              <input
                type="text"
                defaultValue={formData?.role}
                {...register("role", { required: true })}
                className={styles.modalFormInput}
              />
            </div>
            <div className={styles.modalFormButtonContainer}>
              <button type="submit" className={styles.modalFormButton}>
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className={`${styles.modalFormButton} ${styles.modalFormCancelButton}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UsersManagement;
