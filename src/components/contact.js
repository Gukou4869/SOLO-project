import React from "react";
import Form from "./Form";
import firebaseDb from "../firebase";

const Contacts = () => {
  const addOrEdit = (obj) => {
    firebaseDb.child("personalData").push(obj, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };
  return (
    <React.Fragment>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-center">Profile Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <Form addOrEdit={addOrEdit} />
        </div>
        <div className="col-md-7">
          <div>List of Register</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contacts;
