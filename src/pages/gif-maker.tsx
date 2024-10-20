import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Upload from "@/components/Upload";
import styles from "./GifMaker.module.scss";
import Frames from "@/components/gif-maker/Frames";
import Preview from "@/components/gif-maker/Preview";
import Create from "@/components/gif-maker/Create";

export default function GIFMaker() {
  const [urls, setUrls] = useState<string[]>([]);
  const [intervalDuration, setIntervalDuration] = useState<number>(1000);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 100, height: 100 });
  const handleFinish = (uploadedUrls: Array<string>) => {
    setUrls(uploadedUrls);
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
        <div className={`${styles.body} bg-white rounded-lg p-8 shadow-md`}>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">GIF Maker</h1>
          <p>
            This GIF Maker allows the user to upload multiple files, preview the
            images together as a slideshow, and then create the final GIF.
          </p>
          <div className={styles.uploader}>
            <Upload handleFinish={handleFinish} />
          </div>
          {urls.length > 0 && (
            <>
              <Frames urls={urls} setUrls={setUrls} />
              <Preview
                urls={urls}
                intervalDuration={intervalDuration}
                setIntervalDuration={setIntervalDuration}
                dimensions={dimensions}
                setDimensions={setDimensions}
              />
              <Create
                urls={urls}
                intervalDuration={intervalDuration}
                dimensions={dimensions}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
