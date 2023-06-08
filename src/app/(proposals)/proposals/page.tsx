"use client";
import { useEffect, useState } from "react";
import { lightFormat } from "date-fns";
import Header from "@/components/Header/Header";
import styles from "./proposals.module.css";

import Link from "next/link";
import IconButton from "@/components/ui/IconButton";

import { useContract, useContractRead } from "@thirdweb-dev/react";
import { gov_address, gov_ABI } from "../../../constants/index";

type DateType = {
  start: string;
  end: string;
};

export default function Proposals() {
  const { contract } = useContract(gov_address, gov_ABI);
  const { data, isLoading, error } = useContractRead(
    contract,
    "currentProposal"
  );

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<DateType>();

  useEffect(() => console.log(contract), [contract]);
  useEffect(() => {
    if (data) {
      // Title
      setTitle(data.proposalId.toString());

      // Description
      setDesc(data.descriptionString);

      const temp = new Date(data.executionTime.toNumber() * 1000).getTime();

      // Voting start
      const startDate = new Date(temp - 60000 - 150000);

      // Voting end
      const endDate = new Date(temp - 60000);

      setDate({
        start: lightFormat(startDate, "dd-MM-yyyy"),
        end: lightFormat(endDate, "dd-MM-yyyy"),
      });

      // ID
      const id = data.proposalId.toString();
      setId(id);
    }
  }, [data]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.nav_container}>
          <h1 className={styles.title}>Proposals</h1>
          <IconButton
            title="New Proposal"
            href="/new-proposal"
            src="/new.svg"
          />
        </div>
        <p className={styles.category_name}>Active</p>
        <Link href={`/proposals/${id ? id : ""}`}>
          <div
            className={styles.proposal_container}
            style={{ cursor: `${!data ? "not-allowed" : "pointer"}` }}
          >
            <div className={styles.proposal_content_container}>
              <div className={styles.proposal_title_container}>
                <h1 className={styles.proposal_title}>
                  {title && title != "0" ? title : "Başlık bulunmamakta!"}
                </h1>
                <div className={styles.proposal_status_container}>
                  <div className={styles.proposal_status_indicator}></div>
                  <p className={styles.proposal_status_text}>Live</p>
                </div>
              </div>
              <p className={styles.proposal_desc}>
                {desc ? desc : "Bu kontratta açıklama bulunmamakta."}
              </p>
            </div>
            <p className={styles.proposal_deadline}>
              {date
                ? `${date.start} - ${date.end}`
                : "Tarih aralığı bilinmiyor."}
            </p>
          </div>
        </Link>
        {/* <p className={styles.category_name}>Closed</p>
        <div
          className={`${styles.proposal_container} ${styles.proposal_container_disabled}`}
        >
          <h1
            className={`${styles.proposal_title} ${styles.proposal_title_disabled}`}
          >
            Lorem İpsum Lorem İpsum Bıktım Bu Lorem İpsumdan İpsum
          </h1>
        </div>
        <div
          className={`${styles.proposal_container} ${styles.proposal_container_disabled}`}
        >
          <h1
            className={`${styles.proposal_title} ${styles.proposal_title_disabled}`}
          >
            Lorem İpsum Lorem İpsum Bıktım Bu Lorem İpsumdan İpsum
          </h1>
        </div> */}
      </div>
    </>
  );
}
