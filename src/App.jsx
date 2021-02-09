import React from "react";
import "./App.css";
import Contacts from "./components/contact";

export default function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <div className="row">
        <div className="col-md-8 offset-md-1">
          <Contacts />
        </div>
      </div>
    </div>
  );
}
