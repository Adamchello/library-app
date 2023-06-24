import { FormProvider, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useUsers } from "../../hooks/useUsers";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

type LoginFormValues = {
  username: string;
  password: string;
};

function LoginPage() {
  const [users] = useUsers();
  const [_, setCurrentUser] = useCurrentUser();
  const navigate = useNavigate();

  const methods = useForm<LoginFormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
          <FormInput label="Username" name="username" />
          <FormInput label="Password" name="password" type="password" />
          <Button type="submit" label="Login" />
        </form>
      </FormProvider>
    </div>
  );
}

export default LoginPage;
