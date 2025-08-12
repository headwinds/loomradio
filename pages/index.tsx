import Head from "next/head";
import LoomRadio from "@/components/LoomRadio";

export default function Home() {
  return (
    <>
      <Head>
        <title>LoomRadio - Modern Internet Radio</title>
        <meta
          name="description"
          content="LoomRadio - Your modern internet radio experience"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoomRadio />
      </main>
    </>
  );
}
