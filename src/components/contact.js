import React, { useState, useEffect } from "react";
import Select from "react-select";
import Form from "./Form";
import firebaseDb from "../firebase";
import Setting from "./Setting";
import Food from "./Food";
import "./contact.css";

const Contacts = () => {
  const [personalObjects, setPersonalObjects] = useState(0);
  const [currentId, setCurrentId] = useState("");
  useEffect(() => {
    firebaseDb.child("personalData").on("value", (snapshot) => {
      if (snapshot.val() !== null)
        setPersonalObjects({
          ...snapshot.val(),
        });
      else setPersonalObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "")
      firebaseDb.child("personalData").push(obj, (err) => {
        if (err) console.log(err);
        else {
          setCurrentId("");
        }
      });
    else
      firebaseDb.child(`personalData/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`personalData/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };
  const allData = () => {
    let result = [];
    let nameData = {};
    for (let i in personalObjects) {
      let name = personalObjects[i].fullName;
      nameData = { value: name, label: name };
      result.push(nameData);
    }
    return result;
  };

  const newNameData = allData();

  return (
    <React.Fragment>
      <div className="contact">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-center">Calirie Caliculator</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <Form {...{ addOrEdit, currentId, personalObjects }} />
          </div>
          <div className="col-md-7">
            <table className="table table-borderd table-stripped">
              <thead className="thead-light">
                <tr>
                  <th>FullName</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Gender</th>
                  <th>ExcerciseFrequency</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(personalObjects).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{personalObjects[id].fullName}</td>
                      <td>{personalObjects[id].height}</td>
                      <td>{personalObjects[id].weight}</td>
                      <td>{personalObjects[id].gender}</td>
                      <td>{personalObjects[id].excerciseFrequency}</td>
                      <td>
                        <a
                          className="btn text-primary"
                          onClick={() => {
                            setCurrentId(id);
                          }}
                        >
                          <i className="fas fa-pen alt"></i>
                        </a>
                        <a
                          className="btn text-danger"
                          onClick={() => onDelete(id)}
                        >
                          <i className="fas fa-trash alt"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Setting newNameData={newNameData} personalObjects={personalObjects} />
        <Food />
      </div>
    </React.Fragment>
  );
};

export default Contacts;
