import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const testText = "the-fox-that-jumped-over-the-fence";
  return (
    <>
      <Head>
        <title>Shoefish</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full items-center justify-center">
        <h1>{testText}</h1>
      </main>
    </>
  );
};

export default Home;
