import React from "react";
import styles from "./Frames.module.scss";

interface FramesProps {
  urls: Array<string>;
  setUrls: (urls: Array<string>) => void;
}

const Frames = ({ urls, setUrls }: FramesProps) => {
  const handleDelete = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Frames of GIF:</div>
      <div className={styles.imagesContainer}>
        {urls.map((url, index) => (
          <div key={index}>
            <img src={url} alt="single frame" className={styles.image} />
            <button
              onClick={() => handleDelete(index)}
              className={
                "px-2 py-1 rounded-lg text-white bg-red-500 hover:bg-red-600 text-xs"
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frames;
