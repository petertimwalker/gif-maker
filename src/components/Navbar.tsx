import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link
          href="/"
          className={router.pathname == "/" ? styles.activeLink : styles.link}
        >
          Home
        </Link>
      </div>
      <div className={styles.item}>
        <Link
          href="/grayscale"
          className={
            router.pathname == "/grayscale" ? styles.activeLink : styles.link
          }
        >
          Grayscale
        </Link>
      </div>
      <div className={styles.item}>
        <Link
          href="/gif-maker"
          className={
            router.pathname == "/gif-maker" ? styles.activeLink : styles.link
          }
        >
          GIF Maker
        </Link>
      </div>
    </div>
  );
}
