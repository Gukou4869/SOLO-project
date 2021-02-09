import React from "react";
import "./App.css";
import Contacts from "./components/contact";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <div className="row">
        <div className="col-md-8 offset-md-1">
          <Navbar />
          <Contacts />
        </div>
      </div>
    </div>
  );
}
