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

  const renderDownloadButton = () => {
    if (!gif) return null;
    return (
      <a href={gif}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Download GIF
        </button>
      </a>
    );
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Oops! Something went wrong while creating your GIF
        </h2>
        <p className="mb-4">{error}</p>
        <p>We are sorry for the inconvenience. Please try again later</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-gray-700">
        The image above is a preview of what your GIF will look like after using
        this tool. To create your final GIF, click the button below:
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading ...</div>
      ) : (
        <input
          type="button"
          value="Create GIF"
          onClick={create}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        />
      )}
      {renderFinalGif()}
      {renderDownloadButton()}
      {renderError()}
    </div>
  );
};

export default CreateButton;
