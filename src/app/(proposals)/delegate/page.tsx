"use client";
import { ChangeEvent, useState } from "react";
import { useContractWrite, useContract } from "@thirdweb-dev/react";

import Header from "@/components/Header/Header";
import styles from "./delegate.module.css";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";

import { token_ABI, token_address } from "../../../constants/index";

export default function Delegate() {
  const [text, setText] = useState("");

  const onText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const { contract } = useContract(token_address, token_ABI);
  console.log(contract);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "delegate"
  );

  return (
    <>
      <Header />
      <div className={styles.container}>
        <IconButton title="Proposals" href="/proposals" />
        <div className={styles.delegate_container}>
          <Input
            title="To"
            placeholder="Address or ENS Name"
            onChangeText={onText}
          />
          <div className={styles.button_container}>
            <Button
              title="Confirm"
              onClick={async () => await mutateAsync({ args: [text] })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
