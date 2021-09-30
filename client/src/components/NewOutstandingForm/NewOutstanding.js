import React, { useState } from "react";
import "./NewOutstanding.css";

function NewOutstanding({ url }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit() {
    if (name === "" || dueDate === "") return;
    const msiouAuth = localStorage.getItem("msiou-auth");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "msiou-auth": msiouAuth },
      body: JSON.stringify({ name, dueDate }),
    };
    fetch(`${url}/outstandings/createOutstanding`, requestOptions)
      .then((res) => res.json())
      .then((data) => (window.location.href = "/"));
  }

  return (
    <div className="Main">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        className="newInput"
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name..."
      ></input>
      <br />
      <label htmlFor="dueDate">Due Date</label>
      <input
        type="text"
        className="newInput"
        id="dueDate"
        name="dueDate"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        placeholder="Due date..."
      ></input>
      <br />
      <input
        type="button"
        className="Button"
        value="Create"
        onClick={() => handleSubmit()}
      ></input>
    </div>
  );
}

export default NewOutstanding;
