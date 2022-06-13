import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [results, setResults] = useState([]);
  const [times, setTimes] = useState(10);

  const generateResult = async () => {
    console.log(times);
    let randomArr = await Promise.all(
      [...Array(parseInt(times))].map((el) => {
        return generate6number();
      })
    );
    console.log("randomArr", randomArr);

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
    return new Set(arr).size !== arr.length;
  }

  const handleChange = (event) => {
    setTimes(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TextField id="outlined-basic" variant="outlined" onChange={handleChange} value={times} color="success"/>
        <Button variant="contained" onClick={() => generateResult()}>
          Generate
        </Button>
        {results && (
          <div style={{ whiteSpace: "pre-line" }}>
            {results.map((el, ind) => {
              return (
                <div>
                  {`${el}`}
                  <Button variant="contained" onClick={() => remove(ind)}>
                    x
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
