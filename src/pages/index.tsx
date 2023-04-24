import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Countdown from "react-countdown";

const Home: NextPage = () => {
  const [correct, setCorrect] = useState(true);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);

  const handleTimerState = () => {
    setStarted(true);
  };
  //timer
  const time = React.useMemo(() => {
    return Date.now() + 30 * 1000;
  }, [started]);

  const renderer = ({ seconds }: { seconds: number }) => {
    if (!started) {
      return <button onClick={handleTimerState}>Start</button>;
    } else {
      return <span>{seconds}</span>;
    }
  };

  const testText = "the fox that jumped over the fence";
  useEffect(() => {
    const detectKeyDown = (e) => {
      console.log("Clicked key: ", e.key);
      if (e.key === testText[index] && e.key !== "Backspace") {
        setIndex(index + 1);
        setCorrect(correct);
        setPressedKeys([...pressedKeys, e.key]);
      } else if (e.key === "Backspace" && index >= 0) {
        setPressedKeys(pressedKeys.slice(0, -1));
        setIndex(index - 1);
      } else {
        setPressedKeys([...pressedKeys, e.key]);
        setCorrect(false);
      }
    };

    document.addEventListener("keydown", detectKeyDown, true);
  }, [index]);
  console.log(pressedKeys.join("").split(" "));
  return (
    <>
      <Head>
        <title>Shoefish</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <Countdown
          date={time}
          renderer={renderer}
          onComplete={() => setStarted(false)}
        ></Countdown>
        {started ? <h1>{testText}</h1> : <></>}
        <div className="flex">
          <p
            className={clsx({
              ["text-red-600"]: !correct,
              ["text-green-500"]: correct,
            })}
          >
            {pressedKeys.map((i) => (
              <>{i}</>
            ))}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
