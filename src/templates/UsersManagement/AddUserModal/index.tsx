import { FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import styles from "./styles.module.css";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";

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
  const methods = useForm<User>();
  const { register, handleSubmit, setValue, watch, reset } = methods;

  const onSubmit = (user: User) => {
    addUser(user);
    reset();
  };

  const selectedRole = watch("role", "");
  register("role");

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal} title="Add User">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
          <FormInput name="username" label="Username" />
          <FormInput name="password" label="Password" />
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
            <Button type="submit" label="Add" />
            <Button variant="secondary" onClick={closeModal} label="Cancel" />
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddUserModal;
