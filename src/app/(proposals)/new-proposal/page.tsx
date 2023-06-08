"use client";
import Header from "@/components/Header/Header";
import IconButton from "@/components/ui/IconButton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import styles from "./new-proposal.module.css";

import { useState } from "react";
import { useAddress, useContractWrite, useContract } from "@thirdweb-dev/react";

import { ethers } from "ethers";
import { gov_ABI, gov_address, tr_ABI, tr_address } from "@/constants";

import Image from "next/image";
import { parseEther } from "ethers/lib/utils";

export default function NewProposal() {
  const address = useAddress();

  const [desc, setDesc] = useState("");
  const [elements, setElements] = useState([
    {
      to: "",
      amount: "",
    },
  ]);

  const { contract } = useContract(gov_address, gov_ABI);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "propose"
  );

  const iface = new ethers.utils.Interface(tr_ABI);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <IconButton title="Proposals" href="/proposals" />
        {!address && (
          <div className={styles.wallet_warn_container}>
            <p className={styles.wallet_warn_text}>
              In order to submit a proposal, it is necessary to{" "}
              <span>link your wallet.</span>
            </p>
          </div>
        )}
        <div className={styles.form_container}>
          {/* <div className={styles.title_container}>
            <div className={styles.sub_title_container}>
              <h3 className={styles.sub_title_text}>Title</h3>
            </div>
            <div className={styles.title_input_container}>
              <input type="text" className={styles.title_input} />
            </div>
          </div> */}
          <div className={styles.desc_container}>
            <div className={styles.sub_title_container}>
              <h3 className={styles.sub_title_text}>Description</h3>
              <p>0/14.000</p>
            </div>
            <div className={styles.desc_input_container}>
              <textarea
                className={styles.desc_input}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.selection_container}>
            <div className={styles.sub_title_container}>
              <div className={styles.sub_title_text}>Voting System</div>
            </div>
            <div className={styles.selection_input_container}>
              <input
                type="checkbox"
                className={styles.selection_input}
                disabled
                checked
              />
              <p>Single Choice System</p>
            </div>
          </div>
          <div className={styles.selection_container}>
            <div className={styles.sub_title_container}>
              <div className={styles.sub_title_text}>Command Type</div>
            </div>
            <div className={styles.selection_input_container}>
              <input
                type="checkbox"
                className={styles.selection_input}
                disabled
                checked
              />
              <p>Transfer</p>
            </div>
          </div>
          {elements.map((el, i) => {
            return (
              <div key={i} className={styles.element_container}>
                <Input
                  title="To"
                  placeholder="Address or ENS Name"
                  onChangeText={(e) => {
                    const temp = [...elements];
                    temp[i].to = e.target.value;
                    setElements(temp);
                  }}
                  className={styles.to_container}
                />
                <Input
                  title="Amount"
                  placeholder=""
                  onChangeText={(e) => {
                    const temp = [...elements];
                    temp[i].amount = e.target.value;
                    setElements(temp);
                  }}
                  className={styles.amount_container}
                />
                <div className={styles.delete_element}>
                  {elements.length > 1 && i != 0 && (
                    <Image
                      src="/delete.svg"
                      alt=""
                      width={24}
                      height={24}
                      onClick={() => {
                        const temp = [...elements];
                        temp.splice(i, 1);
                        setElements(temp);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
          <div
            className={styles.add_container}
            onClick={() => {
              const temp = [...elements];
              temp.push({ to: "", amount: "" });
              setElements(temp);
            }}
          >
            <Image src="/new.svg" alt="" width={34} height={34} />
          </div>
        </div>
        <div className={styles.button_container}>
          <Button
            title="Confirm"
            onClick={async () => {
              let arr: any = [];
              let values: any = [];
              let targets: any = [];

              elements.map((el) => {
                const temp = iface.encodeFunctionData("transfer", [
                  el.to,
                  parseEther(el.amount),
                ]);
                arr.push(temp);
                values.push(0);
                targets.push(tr_address);
              });

              console.log([targets, values, arr, desc]);

              await mutateAsync({ args: [targets, values, arr, desc] });
            }}
          />
        </div>
      </div>
    </>
  );
}
