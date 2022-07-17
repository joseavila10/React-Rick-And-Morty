import React from "react";
import styles from "../assets/styles/button.module.css";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
    const navigate = useNavigate()
  return (
    <div className={styles.mainDiv} onClick={() => navigate(props.path)}>
        {props.text}
    </div>
  )
}

export default Button