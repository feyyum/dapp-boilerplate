import styles from "./button.module.css";

type Props = {
  title?: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  title = "Button",
  onClick = () => {},
  className = "",
}: Props) {
  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={() => onClick()}
    >
      <p className={styles.text}>{title}</p>
    </div>
  );
}
