import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

export default function Text(props) {
  useEffect(() => {
    const getText = async () => {
      try {
        const data = await axios.get("http://metaphorpsum.com/sentences/3");
        props.settext(data.data);
      } catch (error) {
        alert("Text.js ", error.message);
      }
    };
    getText();
  }, []);

  return (
    <>
      {!props.text ? (
        <>loading...</>
      ) : (
        <Box sx={{ m: 1, width: "80%" }} noValidate autoComplete="off">
          {props.length !== null && props.length > 0 ? (
            <>
              <Typography
                sx={{
                  bgcolor: props.matching ? "#99CC21" : "#F0A3A3",
                  display: "inline",
                }}
              >
                {props.text.substring(0, props.length)}
              </Typography>
              <Typography
                sx={{
                  display: "inline",
                }}
              >
                {props.text.substring(props.length)}
              </Typography>
            </>
          ) : (
            <>
              <Typography>{props.text}</Typography>
            </>
          )}
        </Box>
      )}
    </>
  );
}
