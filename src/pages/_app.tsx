import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans, Raleway } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${openSans.className} ${raleway.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
