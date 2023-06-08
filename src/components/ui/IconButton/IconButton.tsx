import styles from "./icon_button.module.css";

import Link from "next/link";
import Image from "next/image";

type Props = {
  href?: string;
  title?: string;
  src?: string;
};

export default function IconButton({
  href = "#",
  title = "",
  src = "/back.svg",
}: Props) {
  return (
    <Link href={href}>
      <div className={styles.back_button_container}>
        <Image src={src} alt="" width={24} height={24} />
        <h3 className={styles.back_button_text}>{title}</h3>
      </div>
    </Link>
  );
}
