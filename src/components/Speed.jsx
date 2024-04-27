import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Speed(props) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);



  useEffect(() => {
    if (props.startTime) {
      const timer = setInterval(() => {
        const elapsedTimeInSeconds = Math.floor(
          (Date.now() - props.startTime) / 1000
        );
        setElapsedTime(elapsedTimeInSeconds);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [props.startTime]);

  useEffect(() => {
    const words = props.input
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");
    const characters = props.input.replace(/\s/g, "").length;

    setWordCount(words.length);
    setCharCount(characters);
    props.setSpeed({
      instantaneous: (characters / elapsedTime) * 60,
      cpm: (characters / elapsedTime) * 60,
      wpm: (words.length / elapsedTime) * 60,
    });
  }, [props.input, elapsedTime]);
  return (
    <>
      <Box sx={{ m: 1, width: "80%" }} noValidate autoComplete="off">
        <p>Time Elapsed: {elapsedTime} seconds</p>
        <p>Character Count: {charCount}</p>
        <p>Word Count: {wordCount}</p>
        {props.speed.instantaneous >= 0 && (
          <p>
            Instantaneous Speed: {props.speed.instantaneous.toFixed(0)} characters per
            minute
          </p>
        )}
        {props.speed.cpm >= 0 && (
          <p>CPM (Characters per minute): {props.speed.cpm.toFixed(0)}</p>
        )}
        {props.speed.wpm >= 0 && (
          <p>WPM (Words per minute): {props.speed.wpm.toFixed(0)}</p>
        )}
      </Box>
    </>
  );
}
