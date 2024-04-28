import { Box, Typography } from "@mui/material";
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
        <Typography>Time Elapsed: {elapsedTime} seconds</Typography>
        <Typography>Character Count: {charCount}</Typography>
        <Typography>Word Count: {wordCount}</Typography>
        {props.speed.instantaneous >= 0 && (
          <Typography>
            Instantaneous Speed: {props.speed.instantaneous.toFixed(0)} characters per
            minute
          </Typography>
        )}
        {props.speed.cpm >= 0 && (
          <Typography>CPM (Characters per minute): {props.speed.cpm.toFixed(0)}</Typography>
        )}
        {props.speed.wpm >= 0 && (
          <Typography>WPM (Words per minute): {props.speed.wpm.toFixed(0)}</Typography>
        )}
      </Box>
    </>
  );
}
