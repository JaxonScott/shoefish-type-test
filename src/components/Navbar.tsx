import React, { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { IoTimeSharp } from "react-icons/io5";
import {TbLetterA} from 'react-icons/tb'

export default function Navbar({
  setStarted,
  setTimePicker,
  timePicker,
  onCompleteTime,
}: {
  setStarted: Dispatch<SetStateAction<boolean>>;
  setTimePicker: Dispatch<SetStateAction<number>>;
  onCompleteTime: () => void;
  timePicker: number;
}) {
  return (
    <div className=" mx-auto mt-4 flex w-1/2 justify-between rounded-md bg-slate-500 bg-opacity-20 px-4 py-2">
      <div>
        <p>Shoefish</p>
      </div>
      <div className="text-sm my-auto flex gap-4">
        <button className="flex gap-1">
          <span className="my-auto">
            <IoTimeSharp />
          </span>
          time
        </button>
        <button className="flex gap-1">
          <span className="my-auto t">
         <TbLetterA />
          </span>
          words
        </button>
      </div>
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
      </div>
    </div>
  );
}
