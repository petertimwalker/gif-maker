import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Upload from "@/components/Upload";
import Preview from "@/components/grayscale/Preview";
import Create from "@/components/grayscale/Create";
import styles from "./Grayscale.module.scss";

const Grayscale = () => {
  const [url, setUrl] = useState("");

  const handleFinish = (uploadedUrls: Array<string>) => {
    setUrl(uploadedUrls[0]);
  };

  return (
    <>
      <Head>
        <title>Grayscale Generator — Kapwing Interview</title>
        <meta
          name="description"
          content="This grayscale generator takes an image, handles the upload, and returns the image with a grayscale effect applied."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn-useast1.kapwing.com/static/TwE-favicon.ico"
        />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.body}>
          <h1 className={styles.header}>Grayscale Generator</h1>
          <div className={styles.content}>
            <p>
              This tool allows a user to upload an image, see a preview of it in
              grayscale, click create and receive their image with grayscale
              applied. To get started, upload an image below:
            </p>
          </div>
          <div className={styles.uploader}>
            <Upload handleFinish={handleFinish} />
          </div>
          {url && (
            <div className={styles.tool}>
              <Preview url={url} />
              <Create url={url} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Grayscale;
