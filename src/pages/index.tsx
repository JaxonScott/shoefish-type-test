import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Countdown from "react-countdown";
import testData from "../data/data.json";
import { MdRefresh } from "react-icons/md";
import Navbar from "~/components/Navbar";

const Home: NextPage = () => {
  const [k, setK] = useState(false);
  const [started, setStarted] = useState(false);
  const [correctWords, setCorrectWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [correct, setCorrect] = useState(true);
  const [timePicker, setTimePicker] = useState(30);
  const [gameMode, setGameMode] = useState("time");
  const [wordModeLength, setWordModeLength] = useState(10);

  const onCompleteTime = () => {
    console.log("restarting timer");
    setK((i) => !i);
    setStarted(true);
    setUserInput("");
    setCorrectWords([]);
  };

  function wordsPerMinute(correctWords: number, totalWords: number) {
    let result = (correctWords / (totalWords - 1)) * 100;
    return result.toFixed(2);
  }

  function calcWpm(words: number, time: number) {
    const minutes = time / 60;
    const wordsPerMinute = Math.round(words / minutes);
    return wordsPerMinute;
  }

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
          <div className="flex  flex-col-reverse justify-center">
            <button
              onClick={() => onCompleteTime()}
              className="rounded-md px-4 py-1 hover:bg-slate-600 hover:bg-opacity-25"
            >
              start
            </button>
            <p>{`score: ${correctWords.length}`}</p>
            <p>
              {" "}
              {correctWords.length >= 1
                ? "acc: " +
                  wordsPerMinute(
                    correctWords.length,
                    userInput.split(" ").length
                  ) +
                  "%"
                : null}
            </p>
            <p>
              {correctWords.length >= 1
                ? "wpm: " + calcWpm(correctWords.length, timePicker)
                : null}
            </p>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex justify-center gap-4">
          <p>{seconds}</p>
          <button
            onClick={() => onCompleteTime()}
            className="rounded-md px-2 py-0.5 hover:bg-slate-600 hover:bg-opacity-25"
          >
            <MdRefresh className="text-xl" />
          </button>
        </div>
      );
    }
  };

  //timer
  const time = React.useMemo(() => {
    if (gameMode === "time") {
      return Date.now() + timePicker * 1000;
    }
    if (gameMode === "words") {
      return Date.now() + 100 * 1000;
    }
  }, [k]);

  const userInputArr = userInput.split(" ");
  //compares
  useEffect(() => {
    setCurrentWord(userInputArr[userInputArr.length - 1]);
    console.log(correctWords);
    // if (userInput === testData.text.join(" ").slice(0, userInput.length)) {
    if (
      currentWord[currentWord.length - 1] ===
      testData.text[userInputArr.length - 1][currentWord.length - 1]
    ) {
      console.log(
        `Current word:${
          currentWord[currentWord.length - 1]
        }, TestTextCurrent Wrd: ${
          testData.text[userInputArr.length - 1][currentWord.length - 1]
        }`
      );

      setCorrect(true);
      if (
        userInputArr[userInputArr.length - 1] ===
          testData.text[userInputArr.length - 1] &&
        userInputArr[userInputArr.length - 1] !==
          correctWords[correctWords.length - 1]
      ) {
        setCorrectWords([
          ...correctWords,
          userInputArr[userInputArr.length - 1],
        ]);
      } else if (
        gameMode === "time" &&
        userInput.length + 1 >= testData.text.join("").length
      ) {
        setStarted(false);
      } else if (
        gameMode === "words" &&
        userInputArr.length - 1 >= testData.text.slice(0, wordModeLength).length
      ) {
        setStarted(false);
      }
    } else {
      console.log(
        `Current word:${
          currentWord[currentWord.length - 1]
        }, TestTextCurrent Wrd: ${
          testData.text[userInputArr.length - 1][currentWord.length - 1]
        }`
      );
      setCorrect(false);
    }
  }, [userInput, currentWord]);

  return (
    <>
      <Head>
        <title>Shoefish</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="sticky top-8">
          <Navbar
            setTimePicker={setTimePicker}
            timePicker={timePicker}
            gameMode={gameMode}
            setGameMode={setGameMode}
          />
        </div>
        <div className="mx-auto flex h-screen w-1/2 flex-col items-center justify-center">
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
            </div>
            <Countdown
              key={k}
              date={time}
              renderer={renderer}
              onComplete={() => setStarted(false)}
            ></Countdown>
          </div>
          {started ? (
            <div className="">
              {/* <p className="leading-10">{testData.text.join(" ")}</p> */}
              <div className="justify-centwe flex flex-wrap gap-1">
                {gameMode === "time"
                  ? testData.text.map((i, index) => (
                      <div
                        className={clsx({
                          ["text-green-500"]:
                            index === userInput.split(" ").length - 1 &&
                            correct,
                          ["text-red-500"]:
                            index === userInput.split(" ").length - 1 &&
                            !correct,
                          ["text-gray-400"]:
                            index !== userInput.split(" ").length - 1,
                        })}
                      >
                        {i}
                      </div>
                    ))
                  : testData.text.slice(0, wordModeLength).map((i, index) => (
                      <div
                        className={clsx({
                          ["text-green-500"]:
                            index === userInput.split(" ").length - 1 &&
                            correct,
                          ["text-red-500"]:
                            index === userInput.split(" ").length - 1 &&
                            !correct,
                          ["text-gray-400"]:
                            index !== userInput.split(" ").length - 1,
                        })}
                      >
                        {i}
                      </div>
                    ))}
              </div>
              <textarea
                onPaste={(e: any) => {
                  e.preventDefault();
                  return false;
                }}
                autoFocus
                className="mt-4 h-1/2 w-full border-none bg-slate-800 text-white outline-none"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default Home;
