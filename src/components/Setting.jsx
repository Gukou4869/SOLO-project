import React, { useState } from "react";
import Select from "react-select";
import Target from "./Target";
import "./Setting.css";

const Setting = (props) => {
  const [user, setUser] = useState("");
  const [goal, setGoal] = useState("");
  const [target, setTarget] = useState("false");

  const toggleTarget = () => {
    if (goal === "" || user === "") {
      alert("Please select User and Target first!");
      return;
    }
    if (target === "false") {
      setTarget("true");
    } else {
      setTarget("false");
    }
  };

  const handleUserChange = (e) => {
    setUser(e.value);
  };

  const handleTargetChange = (e) => {
    setGoal(e.value);
  };
  const yourTarget = [
    { value: 1, label: "Lean Bulk" },
    { value: 2, label: "Weight Less(S)" },
    { value: 3, label: "Weight Less(M)" },
    { value: 4, label: "Weight Less(L)" },
  ];

  const personal = () => {
    let obj = {};
    const personName = props.personalObjects;
    for (const i in personName) {
      const personal = personName[i];
      const personalName = personal.fullName;
      obj[personalName] = personName[i];
    }
    return obj;
  };
  const person = personal();

  const showTarget = () => {
    if (target === "true") {
      return (
        <div className="show">
          <Target person={person} goal={goal} user={user} />
        </div>
      );
    }
  };
  return (
    <React.Fragment>
      <div>
        <Select
          options={props.newNameData}
          placeholder="Selecet User"
          onChange={handleUserChange}
        />
      </div>
      <div>
        <Select
          options={yourTarget}
          placeholder="Selecet Your Target"
          onChange={handleTargetChange}
        />
      </div>
      <div className="form-group">
        <input
          className="open"
          type="submit"
          value={
            target === "false" ? "Check Your Target!" : "Close Your Target"
          }
          className="btn btn-primary btn-block"
          onClick={toggleTarget}
        />
      </div>
      {showTarget()}
    </React.Fragment>
  );
};

export default Setting;
