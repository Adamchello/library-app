import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

type LoginFormValues = {
  username: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // implement login logic here
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <input
          {...register("username", { required: true })}
          className={styles.inputField}
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <p className={styles.errorMessage}>Username is required</p>
        )}

        <input
          {...register("password", { required: true })}
          className={styles.inputField}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className={styles.errorMessage}>Password is required</p>
        )}

        <input type="submit" value="Login" className={styles.loginButton} />
      </form>
    </div>
  );
}

export default LoginPage;
