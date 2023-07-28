import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kapwing Interview</title>
        <meta
          name="description"
          content="This website contains information, code, and pages that relate to interview projects at Kapwing. Thank you for taking the time to apply."
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
          <h1 className={styles.header}>Interviewing at Kapwing</h1>
        </div>
      </main>
    </>
  );
}
