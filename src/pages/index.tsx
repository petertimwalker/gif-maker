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
      <Navbar />
      <main className={styles.main}>
        <div className={`${styles.body} bg-white rounded-lg p-8 shadow-md`}>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Kapwing Interview Project by Peter Walker
          </h1>
          <div className={styles.content}>
            <p className={styles.p}>
              Thank you for taking the time to apply to{" "}
              <a href="https://www.kapwing.com">Kapwing</a>. This interview
              website contains the code that gets used in our engineering
              interview process. We know it can be a big commitment to apply for
              a new opportunity. We hope to honor your time and treat everyone
              with respect throughout the entire process.
            </p>
            <p className={styles.p}>
              To learn more about what it&apos;s like to work at Kapwing, please
              visit our{" "}
              <a href="https://www.kapwing.com/careers">careers site</a>.
              We&apos;d also love for you to try out any of our video editing{" "}
              <a href="https://www.kapwing.com/tools">tools</a>, and leave us
              any feedback.
            </p>
            <p className={styles.p}>
              If you have questions about this interview project, please reach
              out to us, or refer to the official{" "}
              <a href="https://docs.google.com/document/d/1f7MpfMQevpiHisR4LlHJLUvprPdp4tepQbx29zW59E0/edit">
                project guide
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
