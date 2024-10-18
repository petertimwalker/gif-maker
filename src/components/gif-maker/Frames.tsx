import React from "react";
import styles from "./Frames.module.scss";

interface FramesProps {
  urls: Array<string>;
}

const Frames = ({ urls }: FramesProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Frames of GIF:</div>
      <div className={styles.imagesContainer}>
        {urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="single frame"
            className={styles.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Frames;
