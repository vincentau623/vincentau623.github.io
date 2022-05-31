import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  const generateResult = async () => {
    const random = [...Array(6)]
      .map((el) => {
        return Math.round(49 * Math.random()).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
      })
      .sort((a, b) => (a > b ? 1 : -1));
    if (hasDuplicates(random)) {
      generateResult();
    } else {
      setResults([...results, random]);
    }
  };
  const remove = (ind) => {
    if (ind > -1) {
      const temp = [...results]
      temp.splice(ind, 1)
      setResults(temp);
    }
  };

  function hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => generateResult()}>Learn React</button>
        {results && (
          <div style={{ whiteSpace: "pre-line" }}>
            {results.map((el, ind) => {
              return (
                <div>
                  {`${el}`}
                  <button onClick={() => remove(ind)}>x</button>
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
