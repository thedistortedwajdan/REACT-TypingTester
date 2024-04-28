import { Box, TextField } from "@mui/material";
import { useState } from "react";
import Match from "./Match";

export default function Input(props) {
  const [mistakes, setmistakes] = useState(0);

  const onChange = (e) => {
    try {
      if (e.target.value.length > props.text.length) {
        return;
      }
      if (!props.startTime) {
        props.setStartTime(Date.now());
      }
      const nextInput = e.target.value;
      props.setinput(e.target.value);
      props.setmatching(
        Match(props.text.substring(0, nextInput.length), nextInput)
      );

      props.setdone(props.text === nextInput);

      if (
        !Match(props.text.substring(0, nextInput.length), nextInput) ||
        props.input.length > nextInput.length
      ) {
        if (nextInput.length > props.input.length) {
          // console.log(mistakes + (nextInput.length - props.input.length));
          setmistakes(mistakes + (nextInput.length - props.input.length));
        } else {
          // console.log(
          //   Math.max(mistakes - (props.input.length - nextInput.length), 0)
          // );
          setmistakes(
            Math.max(mistakes - (props.input.length - nextInput.length), 0)
          );
        }
      }
      // setmistakes(
      //   !Match(props.text.substring(0, nextInput.length), nextInput) ||
      //     input.length > nextInput.length
      //     ? nextInput.length > input.length
      //       ? mistakes + (nextInput.length - input.length)
      //       : Math.max(mistakes - (input.length - nextInput.length), 0)
      //     : mistakes
      // );
      props.setlength(nextInput.length);
    } catch (error) {
      alert("Input.jsx ", error.message);
    }
  };
  return (
    <>
      {!props.text ? (
        <></>
      ) : (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "80%" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Type Here"
              multiline
              rows={4}
              value={
                mistakes > 6
                  ? props.input.substring(0, props.input.length - 1)
                  : props.input
              }
              onChange={onChange}
            />
          </div>
        </Box>
      )}
    </>
  );
}
