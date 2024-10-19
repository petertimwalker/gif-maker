import React, { useState } from "react";
import styles from "./Create.module.scss";

interface CreateProps {
  urls: string[];
}

const CreateButton = ({ urls }: CreateProps) => {
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState("");

  const create = () => {
    const body = {
      urls,
    };

    setLoading(true);

    fetch("/api/gif", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const { gifUrl } = result;
          setGif(gifUrl);
          setLoading(false);
        },
        (error) => {
          console.error("An error occurred:", error);
          setLoading(false);
        }
      );
  };

  const renderFinalGif = () => {
    if (!gif) return null;
    return (
      <>
        <div className={styles.header}>Final GIF</div>
        <img src={gif} alt="Final GIF" className={styles.gif} />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        The image above is a preview of what your GIF will look like after using
        this tool. To create your final GIF, click the button below:
      </div>
      {loading ? (
        "Loading ..."
      ) : (
        <input type="button" value="Create GIF" onClick={create} />
      )}
      {renderFinalGif()}
    </div>
  );
};

export default CreateButton;
