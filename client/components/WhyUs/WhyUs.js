import React from "react";
import { BiBody, BiSwim } from "react-icons/bi";
import { FaBed, FaCar, FaTaxi } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import Facility from "../Facility/Facility";
import styles from "./whyus.module.scss";

const Facilities = [
  {
    id: 1,
    title: "Multi-property management",
    text: "you can manage multiple properties or run your own PMS company without having to hire a developer.",
    icon: <FaBed className={styles.icon} />,
  },
  {
    id: 2,
    title: "User Management",
    text: "For each properties, users can be assigned into different roles that have different permissions.",
    icon: <MdFastfood className={styles.icon} />,
  },
  {
    id: 3,
    title: "Intuitive Calendar",
    text: "Simple interface that provides quick overview of your property.",
    icon: <FaCar className={styles.icon} />,
  },
  {
    id: 4,
    title: "Invoices",
    text: "Creation and automatic delivery of the invoices to your clients by mail.",
    icon: <BiBody className={styles.icon} />,
  },
  {
    id: 5,
    title: "24×7 Access",
    text: "One of the key facilities provided by some coworking spaces is round-the-clock accessibility. Thanks to the flexibility in timings, you can head to your shared office at any hour of the day or night.",
    icon: <BiBody className={styles.icon} />,
  },
  {
    id: 5,
    title: "Booking recommendations.",
    text: "Based on previous room usage details and location, rooms will be recommended to users so as to improve user experience.",
    icon: <BiBody className={styles.icon} />,
  },
];

function WhyUs() {
  return (
    <div className={styles.why_us}>
      <div className={styles.why_us_main}>
        <div className={styles.why_us_title}>
          <h2>Why Booking With Us?</h2>
          <p>What Facilities & Services We Offer For You.</p>
        </div>

        <div className={styles.why_us_item}>
          {Facilities.map((facilities) => (
            <Facility key={facilities.id} facilities={facilities} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
