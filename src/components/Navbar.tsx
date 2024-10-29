import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="bg-white p-4 shadow-md">
      <div className="flex space-x-4">
        <div
          className={
            router.pathname == "/"
              ? "bg-teal-100 text-teal-700 p-2 rounded"
              : "text-teal-700 p-2 rounded"
          }
        >
          <Link href="/" className={router.pathname == "/" ? "font-bold" : ""}>
            Home
          </Link>
        </div>
        {/* <div
          className={
            router.pathname == "/grayscale"
              ? "bg-yellow-100 text-yellow-700 p-2 rounded"
              : "text-yellow-700 p-2 rounded"
          }
        >
          <Link
            href="/grayscale"
            className={router.pathname == "/grayscale" ? "font-bold" : ""}
          >
            Grayscale
          </Link>
        </div> */}
        <div
          className={
            router.pathname == "/gif-maker"
              ? "bg-red-100 text-red-700 p-2 rounded"
              : "text-red-700 p-2 rounded"
          }
        >
          <Link
            href="/gif-maker"
            className={router.pathname == "/gif-maker" ? "font-bold" : ""}
          >
            GIF Maker
          </Link>
        </div>
      </div>
    </div>
  );
}
