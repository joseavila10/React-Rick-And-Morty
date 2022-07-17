import React from "react";
import styles from "../assets/styles/home.module.css";
import Button from "../components/Button";


const Home = () => {
  return (
    <div className={styles.mainDiv}>
        <div className={styles.buttonContainers}>
          <Button
          text={"Characters"}
          path={"/characters"}
          />
          <Button
          text={"Episodes"}
          path={"/episodes"}
          />
          <Button
          text={"Locations"}
          path={"/locations"}
          />
        </div>
    </div>
  );
}

export default Home