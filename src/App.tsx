import React, { ChangeEvent, useEffect, useState } from 'react';
import nerd from "nerdamer";
import "nerdamer"
import ktex from "katex";
import { cursedAddition } from './utils';

nerd.set("IMAGINARY", "j");

function App() {

  const [exp, setExp] = useState<string>("");
  const [sol, setSol] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      ktex.render(sol, document.getElementById("output") as HTMLElement);
    } catch (error) {
      setError(error)
      return;
    }
    setError(null);
  }, [sol]);

  function showSol() {
    setLoading(true)
    setTimeout(() => {
      try {
        ktex.render(cursedAddition(exp), document.getElementById("showExp") as HTMLElement);
        setSol(nerd(cursedAddition(exp)).evaluate().text())
      } catch (err) {
        setLoading(false)
        setError(err)
        console.log(err)
        return;
      }
      setLoading(false)
      setError(null)
    })
  }

  return (
    <>
      <main className="container d-flex mt-5 p-5 border-right border-left">
        <div className="mx-auto d-flex flex-column flex-wrap" style={{ maxWidth: 600 }}>
          {error && <div className="alert alert-danger mx-auto">{`${error?.name}: ${error?.message}`}</div>}
          <pre id="showExp"></pre>
          <div className="input-group mb-3">
            <input type="text" className="form-control" onChange={({ target }) => setExp(target.value)} placeholder="impedances" aria-label="Username" aria-describedby="basic-addon1" />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon1">&#x2126;</span>
            </div>
          </div>
          <button className="btn btn-block btn-primary" onClick={showSol}>Evaluate Z<sub>eq</sub></button>
          <pre className="output border mt-3 w-100" style={{ content: "sadlfj", minHeight: 50 }} id="output" >
          </pre>
          {loading && <div className="spinner-border mx-auto" role="status">
            <span className="sr-only">Calculating...</span>
          </div>}
        </div>
      </main>
    </>
  );
}

export default App;
