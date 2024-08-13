import { createContext, useContext } from "react";

const TranscriptContext = createContext();

export const TranscriptProvider = TranscriptContext.Provider;

export function useTranscript() {
  return useContext(TranscriptContext);
}
