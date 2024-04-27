import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

export default function Text(props) {
  const options = {
    method: "GET",
    url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
    headers: {
      accept: "application/json",
      "X-RapidAPI-Key": "e53997a212msh548bd9c442d8daep1ce11ajsn07ee38427df0",
      "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
    },
  };
  useEffect(() => {
    const getText = async () => {
      try {
        const response1 = await axios.request(options);
        const response2 = await axios.request(options);
        const response = response1.data.value + " " + response2.data.value;
        props.settext(response);
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
