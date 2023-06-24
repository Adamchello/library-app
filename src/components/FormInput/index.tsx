import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

function FormInput({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: "text" | "password";
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.formLabel}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name, { required: true })}
        className={styles.formInput}
      />
      {errors[name] && (
        <p className={styles.errorMessage}>{label} is required</p>
      )}
    </div>
  );
}

export default FormInput;
