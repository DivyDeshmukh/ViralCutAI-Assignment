import React, { useEffect, useRef, useState } from "react";
import { useTranscript } from "../Contexts/TranscriptContext";
import { useForm } from "react-hook-form";

function Edit({ word, setIsEdit }) {
  const { transcript, setTranscript } = useTranscript();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      word: word,
    },
  });
  const [buttonType, setButtonType] = useState("correct");
  const updateTranscript = (data) => {
    console.log(data);
    if (buttonType === "correct") {
      const updateElemIndex = transcript.findIndex(
        (item) => item.word === word
      );
      const newTranscript = transcript.map((item, index) => {
        if (updateElemIndex === index) {
          item.word = data.word;
        }
        return item;
      });
      setTranscript(newTranscript);
      setIsEdit(false);
    } else {
      const newTranscript = transcript.map((item) => {
        if (item.word === word) {
          item.word = data.word;
        }
        return item;
      });
      setTranscript(newTranscript);
      setIsEdit(false);
    }
  };

  const handleInputChange = (e) => {
    const currentValue = e.target.value;
    const originalValue = word;

    if (currentValue.length < originalValue.length) {
      setValue("word", originalValue);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateTranscript)}
      className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg border-2 border-yellow-500"
    >
      <input
        type="text"
        className="p-2 border-2 border-yellow-500 text-black uppercase font-semibold rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        {...register("word", {
          required: true,
          onChange: handleInputChange,
        })}
      />
      <div className="flex gap-4 mt-4 justify-center">
        <button
          onClick={() => setButtonType("correctAll")}
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white p-3 rounded-3xl shadow-md transition-transform transform hover:scale-105 font-semibold"
        >
          CorrectAll
        </button>
        <button
          onClick={() => setButtonType("correct")}
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white p-3 rounded-3xl shadow-md transition-transform transform hover:scale-105 font-semibold"
        >
          Correct
        </button>
      </div>
    </form>
  );
}

export default Edit;
