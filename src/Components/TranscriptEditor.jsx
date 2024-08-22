import React, { useEffect, useMemo, useState } from "react";
import Edit from "./Edit";
import { useTranscript } from "../Contexts/TranscriptContext";

function TranscriptEditor() {
  const [duration, setDuration] = useState(0);
  const intervalRef = React.useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isEdit, setIsEdit] = useState("");
  const { transcript, totalDuration } = useTranscript();

  useEffect(() => {
    if (isPlay) {
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 50);
      }, 50);
    }

    return () => clearInterval(intervalRef?.current);
  }, [isPlay]);

  useEffect(() => {
    if (duration === totalDuration) {
      setIsPlay(false);
      setDuration(0);
    }
  }, [duration, totalDuration]);

  useEffect(() => {
    console.log(transcript);
    
  }, [transcript]);

  const renderedWords = useMemo(() => {
    return transcript?.map((wordObj, index) => {
      const { word, start_time, duration: wordDuration } = wordObj;
      const isHighlighted =
        duration >= start_time &&
        duration < start_time + wordDuration &&
        isPlay;

      return (
        <div
          key={index}
          className="group cursor-pointer"
          onClick={() => {
            setIsPlay(false);
          }}
        >
          <span
            className={`${
              isHighlighted
                ? "text-yellow-400 bg-yellow-900 bg-opacity-20 px-2 py-1 rounded-lg shadow-md"
                : "text-white"
            } text-xl transition-all duration-300 group-hover:scale-105`}
            onClick={() => {
              setIsEdit(word);
            }}
          >
            {word}&nbsp;
          </span>
        </div>
      );
    });
  }, [duration, transcript]);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black h-screen text-white text-center flex items-center justify-center flex-col">
      <div className="flex flex-wrap gap-2 p-4 max-w-4xl mx-auto rounded-lg bg-gray-900 bg-opacity-50 shadow-lg border-2 border-yellow-500">
        {renderedWords}
      </div>
      {isEdit && (
        <div className="mt-4 p-4 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          <Edit word={isEdit} setIsEdit={setIsEdit} />
        </div>
      )}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setIsPlay((prev) => !prev)}
          className="p-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-black font-semibold border-2 border-yellow-700 rounded-3xl shadow-lg transition-transform transform hover:scale-105"
        >
          {isPlay ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}

export default TranscriptEditor;
