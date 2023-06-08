"use client";
import { usePathname } from "next/navigation";

import { metamaskWallet } from "@thirdweb-dev/react";
import { useConnect, useAddress } from "@thirdweb-dev/react";

const metamaskConfig = metamaskWallet();

import Logo from "../../app/logo.svg";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

import styles from "./header.module.css";

const nav_items = [
  {
    name: "Proposals",
    path: "/proposals",
  },
  {
    name: "Delegate",
    path: "/delegate",
  },
  {
    name: "New Proposal",
    path: "/new-proposal",
  },
];

function Header() {
  const path = usePathname();
  const connect = useConnect();
  const address = useAddress();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <Image
            src={Logo}
            width={148}
            height={22}
            alt="Logo"
            className={styles.logo}
          />
        </Link>
        <div className={styles.nav_container}>
          <ul className={styles.nav_items_container}>
            {nav_items.map((item, i) => {
              return (
                <Link
                  href={item.path}
                  key={i}
                  className={`${styles.nav_item} ${
                    path.includes(item.path) && styles.active_nav_item
                  }`}
                >
                  <li>{item.name}</li>
                </Link>
              );
            })}
          </ul>
          <Button
            title={
              address
                ? `${address.slice(0, 5)}...${address.slice(-5, -1)}`
                : "Connect Wallet"
            }
            onClick={async () => await connect(metamaskConfig)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
