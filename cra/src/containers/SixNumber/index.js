import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const SixNumber = () => {
  const [results, setResults] = useState([]);
  const [times, setTimes] = useState(10);

  const generateResult = async () => {
    // console.log(times);
    let randomArr = await Promise.all(
      [...Array(parseInt(times))].map((el) => {
        return generate6number();
      })
    );
    // console.log("randomArr", randomArr);

    const selection = parseInt(times * Math.random());
    const random = randomArr[selection];

    if (validation(random)) {
      // retry
      generateResult();
    } else {
      setResults([...results, random]);
    }
  };

  const generate6number = async () => {
    return [...Array(6)]
      .map((el) => {
        return Math.round(49 * Math.random()).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
      })
      .sort((a, b) => (a > b ? 1 : -1));
  };

  const remove = (ind) => {
    if (ind > -1) {
      const temp = [...results];
      temp.splice(ind, 1);
      setResults(temp);
    }
  };

  function validation(arr) {
    const repeated = new Set(arr).size !== arr.length;
    let outRange = false;
    arr.forEach((el) => {
      if(parseInt(el) <= 0) 
      (outRange = true);
    });
    return repeated || outRange;
  }

  const handleChange = (event) => {
    if (event.target.value < 1) {
      setTimes(1);
    } else {
      setTimes(event.target.value);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={3}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={handleChange}
          value={times}
          min={0}
        />
        <Button variant="contained" onClick={() => generateResult()}>
          Generate
        </Button>
      </Stack>
      <div>
        {results && (
          <div>
            {results.map((el, ind) => {
              return (
                <Stack key={`${el}-${ind}`} direction="row" spacing={3}>
                  <div>{`${el}`}</div>
                  <Button variant="contained" onClick={() => remove(ind)}>
                    x
                  </Button>
                </Stack>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SixNumber;
