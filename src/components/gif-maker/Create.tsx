import React, { useState } from "react";
import styles from "./Create.module.scss";

interface CreateProps {
  urls: string[];
  intervalDuration: number;
}

const CreateButton = ({ urls, intervalDuration }: CreateProps) => {
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState("");
  const [error, setError] = useState("");

  const create = () => {
    const body = {
      urls,
      intervalDuration,
    };

    setLoading(true);
    setGif("");

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
          const { gifUrl, error } = result;
          setLoading(false);
          setError("");
          if (error) {
            setError(error);
            return;
          }
          // Append a timestamp to the GIF URL to prevent caching
          const cachedGifUrl = `${gifUrl}?t=${new Date().getTime()}`;
          setGif(cachedGifUrl);
        },
        (error) => {
          setError("Internal server error");
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
      {error && (
        <div className={styles.errorContainer}>
          <h2>Oops! Something went wrong while creating your GIF</h2>
          <p className={styles.errorMessage}>{error}</p>
          <br />
          <p>We are sorry for the inconvenience. Please try again later</p>
        </div>
      )}
    </div>
  );
};

export default CreateButton;
