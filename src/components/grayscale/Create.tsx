import React, { useState } from "react";
import styles from "./Create.module.scss";

interface CreateProps {
  url: string;
}

const CreateButton = ({ url }: CreateProps) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  const create = () => {
    const body = {
      url,
    };

    setLoading(true);
    setImage(undefined);

    fetch("/api/grayscale", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const { grayscaledUrl } = result;
          setImage(grayscaledUrl);
          setLoading(false);
        },
        (error) => {
          console.error("An error occurred:", error);
          setLoading(false);
        }
      );
  };

  const renderFinalImage = () => {
    if (!image) return null;
    return (
      <>
        <div className={styles.header}>Final (grayscaled) image:</div>
        <img src={image} alt="Grayscale Final" className={styles.image} />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        The image above is a preview of what your image will look like after
        using this tool. To create your final grayscaled image, click the button
        below:
      </div>
      {loading ? (
        "Loading ..."
      ) : (
        <input type="button" value="Make Image Grayscale" onClick={create} />
      )}
      {renderFinalImage()}
    </div>
  );
};

export default CreateButton;
