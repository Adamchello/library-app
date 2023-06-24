import styles from "./styles.module.css";

function Button({
  variant = "primary",
  type = "button",
  label,
  disabled = false,
  onClick = () => {},
}: {
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles.basicButton} ${
        variant === "primary" ? styles.primaryButton : styles.secondaryButton
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
