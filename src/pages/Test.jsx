import Speed from "../components/Speed";
import Text from "../components/Text";
import Input from "../components/Input";

import { isMobile } from "react-device-detect";
import { useState } from "react";
import { Box, Button } from "@mui/material";

export default function Test() {
  const [controller, setController] = useState(false);

  const handleKeyUp = (e) => {
    if (e.which === 17) {
      setController(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === 17) {
      setController(true);
    }
    if (
      (e.which === 85 || e.which === 67 || e.which === 86) &&
      controller === true
    ) {
      e.preventDefault();
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e) => {
    const isRightClick = e.button === 2 || e.button === 3;
    if (isRightClick) {
      e.preventDefault();
    }
  };

  const handleMouseUp = (e) => {
    const isRightClick = e.button === 2 || e.button === 3;
    if (isRightClick) {
      e.preventDefault();
    }
  };

  const [startTime, setStartTime] = useState(null);
  const [text, settext] = useState(null);
  const [length, setlength] = useState(null);
  const [matching, setmatching] = useState(true);
  const [input, setinput] = useState("");
  const [speed, setSpeed] = useState({
    instantaneous: 0,
    cpm: 0,
    wpm: 0,
  });

  const [done, setdone] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <>
      <Box
        component={"div"}
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={0}
      >
        <Box height={"100vh"}>
          {isMobile ? (
            <>
              <h2>NOT AVAILABLE ON MOBILE 🥰</h2>
            </>
          ) : (
            <>
              {!done ? (
                <>
                  <Speed
                    speed={speed}
                    setSpeed={setSpeed}
                    input={input}
                    done={done}
                    startTime={startTime}
                    setStartTime={setStartTime}
                  />

                  <Text
                    done={done}
                    text={text}
                    settext={settext}
                    length={length}
                    matching={matching}
                  />
                  <Input
                    done={done}
                    setdone={setdone}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    input={input}
                    setinput={setinput}
                    text={text}
                    setlength={setlength}
                    setmatching={setmatching}
                  />
                </>
              ) : (
                <>
                  <Box
                    sx={{ m: 1, width: "80%" }}
                    noValidate
                    autoComplete="off"
                  >
                    <h2>YOUR SPEED</h2>
                    {speed.cpm >= 0 && (
                      <p>CPM (Characters per minute): {speed.cpm.toFixed(0)}</p>
                    )}
                    {speed.wpm >= 0 && (
                      <p>WPM (Words per minute): {speed.wpm.toFixed(0)}</p>
                    )}
                  </Box>
                </>
              )}
              {!text ? (
                <></>
              ) : (
                <Box sx={{ m: 1, width: "80%" }} noValidate autoComplete="off">
                  <Button variant="contained" onClick={onClick}>
                    RESET
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
