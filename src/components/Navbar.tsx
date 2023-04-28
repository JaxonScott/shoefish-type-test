import React, { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { IoTimeSharp } from "react-icons/io5";
import { FaTools } from "react-icons/fa";

export default function Navbar({
  setTimePicker,
  timePicker,
  gameMode,
  setGameMode,
}: {
  setTimePicker: Dispatch<SetStateAction<number>>;
  timePicker: number;
  gameMode: string;
  setGameMode: Dispatch<SetStateAction<string>>;
}) {
  console.log(gameMode);
  return (
    <div className=" mx-auto mt-4 flex w-1/2 justify-between rounded-md bg-slate-500 bg-opacity-20 px-4 py-2">
      <div>
        <p>Shoefish</p>
      </div>
      <div className="my-auto flex gap-4 text-sm">
        <button
          onClick={() => setGameMode("time")}
          className={clsx({
            ["flex gap-1 text-amber-400"]: gameMode === "time",
            ["flex gap-1"]: gameMode !== "time",
          })}
        >
          <span className="my-auto">
            <IoTimeSharp />
          </span>
          time
        </button>
        <button
          className={clsx({
            ["flex gap-1 text-amber-400"]: gameMode === "words",
            ["flex gap-1"]: gameMode !== "words",
          })}
          onClick={() => setGameMode("words")}
        >
          words
        </button>
      </div>
      {gameMode === "time" ? (
        <div className="flex justify-center gap-4">
          <button
            className={clsx({
              ["text-sm text-amber-400"]: timePicker === 15,
              ["text-sm text-slate-400"]: timePicker !== 15,
            })}
            onClick={() => setTimePicker(15)}
          >
            15s
          </button>
          <button
            onClick={() => setTimePicker(30)}
            className={clsx({
              ["text-sm text-amber-400"]: timePicker === 30,
              ["text-sm text-slate-400"]: timePicker !== 30,
            })}
          >
            30s
          </button>
          <button
            onClick={() => setTimePicker(60)}
            className={clsx({
              ["text-sm text-amber-400"]: timePicker === 60,
              ["text-sm text-slate-400"]: timePicker !== 60,
            })}
          >
            60s
          </button>
          <button className="text-sm text-gray-400">
            <FaTools />
          </button>
        </div>
      ) : (
        <div className="flex gap-4 text-sm text-slate-400">
          <button>10</button>
          <button className="text-amber-400">25</button>
          <button>50</button>
          <button>100</button>
          <button className="text-sm text-gray-400">
            <FaTools />
          </button>
        </div>
      )}
    </div>
  );
}
