import Header from "@/components/Header/Header";
import styles from "./page.module.css";

import Image from "next/image";
import Marquee from "react-fast-marquee";

import Logo from "./logo.svg";
import Chainlink from "./chainlink.svg";

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero_container}>
          <div className={styles.hero_text_container}>
            <h1 className={styles.hero_text}>
              Embracing <span className={styles.hero_text_blue}>Autonomy,</span>
            </h1>
            <h1 className={styles.hero_text}>
              Rejecting{" "}
              <span className={styles.hero_text_black}>Hierarchy</span>.
            </h1>
          </div>
        </div>
        <Marquee className={styles.marquee} pauseOnHover speed={80}>
          <div className={styles.marquee_container}>
            <Image src={Logo} alt="" />
            <p>voting automated by</p>
            <Image src={Chainlink} alt="" className={styles.chainlink_logo} />
          </div>
          <div className={styles.marquee_container}>
            <Image src={Logo} alt="" />
            <p>voting automated by</p>
            <Image src={Chainlink} alt="" className={styles.chainlink_logo} />
          </div>
          <div className={styles.marquee_container}>
            <Image src={Logo} alt="" />
            <p>voting automated by</p>
            <Image src={Chainlink} alt="" className={styles.chainlink_logo} />
          </div>
        </Marquee>
        <div className={styles.about_container}>
          <h1 className={styles.about_title}>ABOUT BOSSLESS</h1>
        </div>
      </div>
    </>
  );
}
