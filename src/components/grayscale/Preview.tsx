import React from "react";
import styles from "./Preview.module.scss";

interface PreviewProps {
  url: string;
}

const Preview = ({ url }: PreviewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Preview of grayscaled image:</div>
      <img src={url} alt="Grayscale Preview" className={styles.image} />
    </div>
  );
};

export default Preview;
