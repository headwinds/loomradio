import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/reset.css";
import "../styles/defaults.css";
import "../styles/range.css";
import "../styles/LoomRadio.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
