import React, { useState, useEffect } from "react";
import Select from "react-select";
import firebaseDb from "../firebase";
import Setting from "./Setting";
import { Table } from "react-bootstrap";

const FoodHistory = (props) => {
  const [food, setfood] = useState(0);
  const initialFieldValues = {
    Food: props.food,
    Amount: props.amount,
    Time: new Date(),
  };

  const [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "")
      setValues({
        ...initialFieldValues,
      });
  }, [props.selectedFood, props.selectedAount]);

  console.log();

  //food={food} amount={amount}
  const selectedFood = props.food;
  const selectedAmount = props.amount;
  const [currentId, setCurrentId] = useState("");
  useEffect(() => {
    firebaseDb.child("hoodHistory").on("value", (snapshot) => {
      if (snapshot.val() !== null)
        setfood({
          ...snapshot.val(),
        });
      else setfood({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "")
      firebaseDb.child("hoodHistory").push(obj, (err) => {
        if (err) console.log(err);
        else {
          setCurrentId("");
        }
      });
    else
      firebaseDb.child(`hoodHistory/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`hoodHistory/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };
  const allData = () => {
    let result = [];
    let nameData = {};
    for (let i in food) {
      let name = food[i].fullName;
      nameData = { value: name, label: name };
      result.push(nameData);
    }
    return result;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  const newNameData = allData();

  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Your Target calories(/day)</th>
            <th>Total Calories(/day)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> kcal</td>
            <td> kcal</td>
            <td>kcal</td>
          </tr>
        </tbody>
      </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Protein (4kcal/g)</th>
            <th>Fat (9kcal/g)</th>
            <th>Carbo (4kcal/g)</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </Table>
      <div className="contact">
        <div className="row">
          <div className="col-md-12"></div>
          <div className="col-md-12">
            <table className="table table-borderd table-stripped">
              <thead className="thead-light">
                <tr>
                  <th>Food</th>
                  <th>Amount(g)</th>
                  <th>Time</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(food).map((id) => {
                  return (
                    <tr key={id}>
                      <td></td>
                      <td></td>
                      <td></td>
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
      </div>
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <div>
          <div className="form-group">
            <input
              type="submit"
              value={props.currentId === "" ? "Save" : "Update"}
              className="btn btn-success btn-block"
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default FoodHistory;
