"use client";
import { useEffect, useState } from "react";
import { lightFormat } from "date-fns";
import Header from "@/components/Header/Header";
import styles from "./proposal.module.css";

import IconButton from "@/components/ui/IconButton";

import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { gov_address, gov_ABI } from "../../../../constants/index";

import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button/Button";

type DateType = {
  start: string;
  end: string;
};

type Ratios = {
  for: string;
  against: string;
  abstain: string;
};

export default function Proposal({ params }: { params: { id: string } }) {
  const path = usePathname();

  const { contract } = useContract(gov_address, gov_ABI);
  const {
    data: cp_data,
    isLoading: cp_isLoading,
    error: cp_error,
  } = useContractRead(contract, "currentProposal");

  const {
    data: pv_data,
    isLoading: pv_isLoading,
    error: pv_error,
  } = useContractRead(contract, "proposalVotes", [
    `${path.split("/proposals/")[1]}`,
  ]);

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "castVote"
  );

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<DateType>();

  const [ratios, setRatios] = useState<Ratios>();

  useEffect(() => {
    if (cp_data) {
      // Title
      setTitle(cp_data.proposalId.toString());

      // Description
      setDesc(cp_data.descriptionString);

      const temp = new Date(cp_data.executionTime.toNumber() * 1000).getTime();

      // Voting start
      const startDate = new Date(temp - 60000 - 150000);

      // Voting end
      const endDate = new Date(temp - 60000);

      setDate({
        start: lightFormat(startDate, "dd-MM-yyyy"),
        end: lightFormat(endDate, "dd-MM-yyyy"),
      });

      // ID
      const id = cp_data.proposalId.toString();
      setId(id);
    }
  }, [cp_data]);

  useEffect(() => {
    if (pv_data) {
      console.log(pv_data);
      const forVotes = pv_data.forVotes.toBigInt();
      const againstVotes = pv_data.againstVotes.toBigInt();
      const abstainVotes = pv_data.abstainVotes.toBigInt();

      if (forVotes == 0 && againstVotes == 0 && abstainVotes == 0) {
        setRatios({
          for: "0%",
          against: "0%",
          abstain: "0%",
        });
      } else {
        setRatios({
          for: `${
            Number(forVotes / (forVotes + abstainVotes + againstVotes)) * 100
          }%`,
          against: `${
            Number(againstVotes / (forVotes + abstainVotes + againstVotes)) *
            100
          }%`,
          abstain: `${
            Number(abstainVotes / (forVotes + abstainVotes + againstVotes)) *
            100
          }%`,
        });
      }
    }
  }, [pv_data]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <IconButton title="Proposals" href="/proposals" />
        <div className={styles.proposal_container}>
          <div className={styles.proposal_content_container}>
            <h1 className={styles.proposal_title}>
              {title ? title : "Başlık Bulunamadı!"}
            </h1>
            <p className={styles.proposal_description}>
              {desc ? desc : "Açıklama Bulunamadı!"}
            </p>
            <div className={styles.voting_container}>
              <Button
                title="For Vote"
                className={styles.forvote_container}
                onClick={async () =>
                  await mutateAsync({
                    args: [`${path.split("/proposals/")[1]}`, 1],
                  })
                }
              />
              <Button
                title="Against"
                className={styles.against_container}
                onClick={async () =>
                  await mutateAsync({
                    args: [`${path.split("/proposals/")[1]}`, 0],
                  })
                }
              />
              <Button
                title="Abstain"
                className={styles.abstain_container}
                onClick={async () =>
                  await mutateAsync({
                    args: [`${path.split("/proposals/")[1]}`, 2],
                  })
                }
              />
            </div>
          </div>
          <div className={styles.proposal_info_container}>
            <div className={styles.box_container}>
              <h3 className={styles.box_title}>Information</h3>
              <div className={styles.box_items_container}>
                <div className={styles.box_item_container}>
                  <p className={styles.box_item_title}>Status</p>
                  <p className={styles.box_item_content}>Active</p>
                </div>
                <div className={styles.box_item_container}>
                  <p className={styles.box_item_title}>Created By</p>
                  <p className={styles.box_item_content}>Ox5Ba.....FbA5</p>
                </div>
                <div className={styles.box_item_container}>
                  <p className={styles.box_item_title}>Start Date</p>
                  <p className={styles.box_item_content}>{date?.start}</p>
                </div>
                <div className={styles.box_item_container}>
                  <p className={styles.box_item_title}>End Date</p>
                  <p className={styles.box_item_content}>{date?.end}</p>
                </div>
              </div>
            </div>
            <div className={styles.box_container}>
              <h3 className={styles.box_title}>Live Results</h3>
              <div className={styles.box_items_container}>
                <div className={styles.box_item_container}>
                  <p className={styles.box_item_title}>For Votes</p>
                  <p className={styles.box_item_content}>
                    {ratios ? ratios.for : "-"}
                  </p>
                </div>
                <div className={styles.box_item_container}>
                  <p className={styles.box_item_title}>Against Votes</p>
                  <p className={styles.box_item_content}>
                    {ratios ? ratios.against : "-"}
                  </p>
                </div>
                <div className={styles.box_item_container}>
                  <p className={styles.box_item_title}>Abstain Votes</p>
                  <p className={styles.box_item_content}>
                    {ratios ? ratios.abstain : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
