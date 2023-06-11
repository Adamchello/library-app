import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Select from "react-select";
import styles from "./styles.module.css";

type User = {
  username: string;
  password: string;
  role: string;
};

const roleOptions = [
  { value: "customer", label: "Customer" },
  { value: "librarian", label: "Librarian" },
];

const AddUserModal = ({
  isModalOpen,
  closeModal,
  addUser,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  addUser: (user: User) => void;
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<User>();

  const onSubmit = (user: User) => {
    addUser(user);
    reset();
  };

  const selectedRole = watch("role", "");
  register("role");

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="User Form"
      ariaHideApp={false}
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
              {...register("username", { required: true })}
              className={styles.modalFormInput}
            />
          </div>
          <div>
            <label className={styles.modalFormLabel}>Password</label>
            <input
              type="text"
              {...register("password", { required: true })}
              className={styles.modalFormInput}
            />
          </div>
          <div>
            <label className={styles.modalFormLabel}>Role</label>
            <Select
              {...register("role", { required: true })}
              options={roleOptions}
              value={roleOptions.find(
                (option) => option.value === selectedRole
              )}
              onChange={(option) => setValue("role", option?.value || "")}
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
  );
};

export default AddUserModal;
