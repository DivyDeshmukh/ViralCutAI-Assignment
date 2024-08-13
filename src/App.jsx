import { useEffect, useState } from "react";
import { initialTranscript } from "./data/transcript";
import TranscriptEditor from "./components/TranscriptEditor";
import { TranscriptProvider } from "./Contexts/TranscriptContext";

function App() {
  const [totalDuration, setTotalDuration] = useState(0);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const duration = initialTranscript.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );
    setTotalDuration(duration);
    setTranscript(initialTranscript);
  }, [initialTranscript]);

  return (
    <TranscriptProvider value={{ transcript, setTranscript, totalDuration }}>
      <TranscriptEditor />
    </TranscriptProvider>
  );
}

export default App;
