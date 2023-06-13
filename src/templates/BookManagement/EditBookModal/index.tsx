import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Select from "react-select";
import styles from "./styles.module.css";
import { useBooks } from "../../../hooks/useBooks";
import { useEffect } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  status: string;
  image: string;
};

const roleOptions = [
  { value: "available", label: "Available" },
  { value: "borrowed", label: "Borrowed" },
];

const EditBookModal = ({
  chosenBookId,
  closeModal,
  editBook,
}: {
  chosenBookId: string;
  closeModal: () => void;
  editBook: (user: Book) => void;
}) => {
  const [books] = useBooks();
  const { register, handleSubmit, setValue, watch, reset } = useForm<Book>();

  const onSubmit = (user: Book) => {
    editBook(user);
    closeModal();
  };

  useEffect(() => {
    const chosenBook = books.find((book) => book.id === chosenBookId);
    if (!chosenBook) return;
    reset(chosenBook);
  }, [chosenBookId]);

  const selectedStatus = watch("status", "");
  register("status");

  return (
    <Modal
      isOpen={chosenBookId.length > 0}
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
            <label className={styles.modalFormLabel}>Image</label>
            <input
              type="text"
              {...register("image", { required: true })}
              className={styles.modalFormInput}
            />
          </div>
          <div>
            <label className={styles.modalFormLabel}>Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className={styles.modalFormInput}
            />
          </div>
          <div>
            <label className={styles.modalFormLabel}>Author</label>
            <input
              type="text"
              {...register("author", { required: true })}
              className={styles.modalFormInput}
            />
          </div>
          <div>
            <label className={styles.modalFormLabel}>Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              className={styles.modalFormInput}
            />
          </div>
          <div>
            <label className={styles.modalFormLabel}>Status</label>
            <Select
              {...register("status", { required: true })}
              options={roleOptions}
              value={roleOptions.find(
                (option) => option.value === selectedStatus
              )}
              onChange={(option) => setValue("status", option?.value || "")}
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

export default EditBookModal;
