import { ChangeEvent } from "react";

import styles from "./input.module.css";

type Props = {
  title?: string;
  placeholder?: string;
  onChangeText?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input({
  title = "Title",
  placeholder = "Placeholder",
  onChangeText = () => {},
  className = "",
}: Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.title_container}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.input_container}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          onChange={(e) => onChangeText(e)}
        />
      </div>
    </div>
  );
}
