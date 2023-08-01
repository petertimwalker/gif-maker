import Head from "next/head";
import Navbar from "@/components/Navbar";
import Upload from "@/components/Upload";
import styles from "./GifMaker.module.scss";

export default function GIFMaker() {
  const handleFinish = (uploadedUrls: Array<string>) => {
    console.log("Uploaded URLs:", uploadedUrls);

    /*
     * Your GIF Maker logic might start here
     */

    return;
  };

  return (
    <>
      <Head>
        <title>Gif Maker — Kapwing Interview</title>
        <meta
          name="description"
          content="This gif maker handles uploading multiple images, allows the user to preview the images playing one after another, and returns the a completed GIF."
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
          <h1 className={styles.header}>GIF Maker</h1>
          <p>
            This GIF Maker allows the user to upload multiple files, preview the
            images together as a slideshow, and then create the final GIF.
          </p>
          <div className={styles.uploader}>
            <Upload handleFinish={handleFinish} />
          </div>
          {/*
           *
           * Your GIF Maker implementation might start here
           *
           */}
        </div>
      </main>
    </>
  );
}
