import React, { useState } from "react";
import "./Task.css";

function Task({ url, outstanding }) {
  const [showNameInput, setShowNameInput] = useState(false);
  const [showDueDateInput, setShowDueDateInput] = useState(false);

  function handleDelete(outstandingId) {
    const msiouAuth = localStorage.getItem("msiou-auth");
    const requestOptions = {
      method: "DELETE",
      headers: { "msiou-auth": msiouAuth },
    };
    fetch(
      `${url}/outstandings/deleteOutstanding/${outstandingId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => window.location.reload(false));
  }

  function handleNameSubmit(outstandingId, newName) {
    if (!newName) return;
    const msiouAuth = localStorage.getItem("msiou-auth");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "msiou-auth": msiouAuth },
      body: JSON.stringify({ name: newName, dueDate: "" }),
    };
    fetch(
      `${url}/outstandings/editOutstanding/${outstandingId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => window.location.reload(false));
  }

  function handleDueDateSubmit(outstandingId, newDueDate) {
    if (!newDueDate) return;
    const msiouAuth = localStorage.getItem("msiou-auth");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "msiou-auth": msiouAuth },
      body: JSON.stringify({ name: "", dueDate: newDueDate }),
    };
    fetch(
      `${url}/outstandings/editOutstanding/${outstandingId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => window.location.reload(false));
  }

  return (
    <div className="card">
      <div className="container">
        <span>
          <span onClick={() => handleDelete(outstanding._id)} className="red">
            x
          </span>{" "}
          {showNameInput ? (
            <input
              type="text"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleNameSubmit(outstanding._id, e.target.value);
                  setShowNameInput(false);
                }
              }}
            ></input>
          ) : (
            <span onClick={() => setShowNameInput(true)}>
              {outstanding.name}
            </span>
          )}
        </span>
        {showDueDateInput ? (
          <input
            type="text"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleDueDateSubmit(outstanding._id, e.target.value);
                setShowDueDateInput(false);
              }
            }}
          ></input>
        ) : (
          <span onClick={() => setShowDueDateInput(true)}>
            {outstanding.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}

export default Task;
