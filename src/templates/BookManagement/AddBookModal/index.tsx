import { FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import styles from "./styles.module.css";
import Button from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import Modal from "../../../components/Modal";

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
  { value: "reserved", label: "Reserved", isDisabled: true },
];

const AddBookModal = ({
  isModalOpen,
  closeModal,
  addBook,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  addBook: (user: Book) => void;
}) => {
  const methods = useForm<Book>();
  const { register, handleSubmit, setValue, watch, reset } = methods;

  const onSubmit = (user: Book) => {
    addBook(user);
    reset();
  };

  const selectedStatus = watch("status", "");
  register("status");

  return (
    <Modal title="Add a book" isOpen={isModalOpen} closeModal={closeModal}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
          <FormInput label="Image" name="image" />
          <FormInput label="Title" name="title" />
          <FormInput label="Author" name="author" />
          <FormInput label="Description" name="description" />
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
            <Button type="submit" label="Save" />
            <Button variant="secondary" onClick={closeModal} label="Cancel" />
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddBookModal;
