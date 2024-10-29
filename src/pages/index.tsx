import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";
import dotenv from "dotenv";

dotenv.config();

export default function Home() {
  return (
    <>
      <Head>
        <title>GIF Maker</title>
        <meta
          name="description"
          content="This is a application that helps you create GIFs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn-useast1.kapwing.com/static/TwE-favicon.ico"
        />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={`${styles.body} bg-white rounded-lg p-8 shadow-md`}>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            AWS S3 Upload Project by Peter Walker
          </h1>
          <div className={styles.content}>
            <p className={styles.p}>Thank you for checking out my project.</p>
          </div>
        </div>
      </main>
    </>
  );
}
