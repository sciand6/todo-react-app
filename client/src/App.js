import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./components/Task/Task";
import NewOutstanding from "./components/NewOutstandingForm/NewOutstanding";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const url = "https://msiou.herokuapp.com";
  const [outstandings, setOutstandings] = useState([]);

  function submitValue(value) {
    if (!value) return;
    localStorage.setItem("msiou-auth", value);
  }

  useEffect(() => {
    const msiouAuth = localStorage.getItem("msiou-auth");
    const requestOptions = {
      method: "GET",
      headers: { "msiou-auth": msiouAuth },
    };
    fetch(`${url}/outstandings/getOutstandings`, requestOptions)
      .then((res) => res.json())
      .then((outstandings) => setOutstandings(outstandings));
  }, []);

  if (!localStorage.getItem("msiou-auth")) {
    return (
      <center>
        <h1>SUBMIT VALUE</h1>
        <input
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              submitValue(e.target.value);
            }
          }}
        ></input>
      </center>
    );
  } else {
    return (
      <div className="Main">
        <h1>Outstandings</h1>
        <Router>
          <Switch>
            <Route path="/new">
              <Link className="Button" to="/">
                Cancel
              </Link>
              <NewOutstanding url={url} />
            </Route>
            <Route path="/">
              <Link className="Button" to="/new">
                New Task
              </Link>
              {outstandings.map((outstanding) => (
                <Task
                  url={url}
                  key={outstanding._id}
                  outstanding={outstanding}
                />
              ))}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
