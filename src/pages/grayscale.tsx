import Head from "next/head";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
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
        </div>
      </main>
    </>
  );
}
