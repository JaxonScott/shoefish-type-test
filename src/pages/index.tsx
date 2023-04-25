import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Countdown from "react-countdown";
import testData from "../data/data.json";

const Home: NextPage = () => {
  const [k, setK] = useState(false);
  const [started, setStarted] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [correct, setCorrect] = useState(true);
  const [timePicker, setTimePicker] = useState(30);

  const onCompleteTime = () => {
    console.log("restarting timer");
    setK((i) => !i);
    setStarted(true);
    setUserInput("");
  };

  const renderer = ({
    seconds,
    completed,
  }: {
    seconds: number;
    completed: boolean;
  }) => {
    if (completed || !started) {
      return (
        <>
          <div className="flex justify-center gap-4">
            <button
              className={clsx({
                ["rounded-md bg-slate-500 bg-opacity-20 px-2 py-0.5"]:
                  timePicker === 15,
              })}
              onClick={() => setTimePicker(15)}
            >
              15s
            </button>
            <button
              onClick={() => setTimePicker(30)}
              className={clsx({
                ["rounded-md bg-slate-500 bg-opacity-20 px-2 py-0.5"]:
                  timePicker === 30,
              })}
            >
              30s
            </button>
            <button
              onClick={() => setTimePicker(60)}
              className={clsx({
                ["rounded-md bg-slate-500 bg-opacity-20 px-2 py-0.5"]:
                  timePicker === 60,
              })}
            >
              60s
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => onCompleteTime()}
              className="mt-4 rounded-md px-4 py-1 hover:bg-slate-600 hover:bg-opacity-25"
            >
              start
            </button>
          </div>
        </>
      );
    } else {
      return <span className="flex justify-center">{seconds}</span>;
    }
  };

  //timer
  const time = React.useMemo(() => {
    return Date.now() + timePicker * 1000;
  }, [k]);

  //compares
  useEffect(() => {
    if (userInput === testData.text.join(" ").slice(0, userInput.length)) {
      console.log(userInput);
      setCorrect(true);
    } else if (userInput.length + 1 >= testData.text.join("").length) {
      setStarted(false);
    } else {
      console.log("not correct");
      setCorrect(false);
    }
  }, [userInput]);

  return (
    <>
      <Head>
        <title>Shoefish</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex h-screen w-1/2 flex-col items-center justify-center">
        <div>
          <div className="mb-4 flex justify-center gap-4">
            {started ? (
              <p>
                {correct ? (
                  <span className="text-green-500">correct</span>
                ) : (
                  <span className="text-red-500">incorrect</span>
                )}
              </p>
            ) : null}
            {userInput.split(" ").length >= 1 ? (
              <p className="flex">
                <span
                  className={clsx({
                    ["text-green-500"]: correct,
                    ["text-red-500"]: !correct,
                  })}
                >{`${userInput.split(" ").length - 1}`}</span>
                /{`${testData.text.length - 1}`}
              </p>
            ) : null}
          </div>
          <Countdown
            key={k}
            date={time}
            renderer={renderer}
            onComplete={() => setStarted(false)}
          ></Countdown>
        </div>
        {started ? (
          <div>
            <p className="leading-10">{testData.text.join(" ")}</p>
            <textarea
              autoFocus
              className="mt-4 h-1/2 w-full border-none bg-slate-800 text-white outline-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        ) : null}
      </main>
    </>
  );
};

export default Home;
