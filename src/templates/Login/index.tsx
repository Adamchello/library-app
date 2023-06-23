import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useUsers } from "../../hooks/useUsers";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type LoginFormValues = {
  username: string;
  password: string;
};

function LoginPage() {
  const [users] = useUsers();
  const [_, setCurrentUser] = useCurrentUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    const foundUser = users.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (!foundUser) {
      alert("user not found");
      return;
    }
    Cookies.set("isLogged", "true");
    setCurrentUser(foundUser);
    navigate("/");
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
