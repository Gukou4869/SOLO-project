import React, { useState, useEffect } from "react";
import Select from "react-select";
import firebaseDb from "../firebase";
import Setting from "./Setting";
import { Table } from "react-bootstrap";

const FoodHistory = (props) => {
  const [food, setfood] = useState(0);
  const initialFieldValues = {
    food: "",
    amount: "",
  };
  const [values, setValues] = useState(initialFieldValues);
  const [foodObjects, setFoodObjects] = useState(0);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    if (props.currentId === "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...foodObjects[setFoodObjects],
      });
  }, [currentId, foodObjects]);

  useEffect(() => {
    firebaseDb.child("hoodHistory").on("value", (snapshot) => {
      if (snapshot.val() !== null)
        setFoodObjects({
          ...snapshot.val(),
        });
      else setFoodObjects({});
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlePulldownInput = (e) => {
    const name = "food";
    const value = e.name;
    setValues({ ...values, [name]: value });
  };
  const time = () => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    return `${hour}:${minute}`;
  };
  const times = time();
  const handleFormSubmit = (e) => {
    if (values.food === undefined || values.amount === undefined) {
      alert("Please input food data!");
      return;
    }
    e.preventDefault();
    addOrEdit(values);
  };
  const newNameData = allData();

  let TOTALPRO = 0;
  const totalProtein = (food, amount) => {
    const list = props.list;
    const sort = list.filter((x) => x.name === food);
    const p = sort[0].protein / sort[0].gram;
    return (TOTALPRO += Math.floor(p * amount));
  };

  let TOTALFAT = 0;
  const totalFat = (food, amount) => {
    const list = props.list;
    const sort = list.filter((x) => x.name === food);
    const p = sort[0].fat / sort[0].gram;
    return (TOTALFAT += Math.floor(p * amount));
  };

  let TOTALCARBO = 0;
  const totalCarbo = (food, amount) => {
    const list = props.list;
    const sort = list.filter((x) => x.name === food);
    const p = sort[0].carbohydrade / sort[0].gram;
    return (TOTALCARBO += Math.floor(p * amount));
  };

  let TOTALCALORIES = 0;
  const totalcalories = () => {
    return (TOTALCALORIES = TOTALCARBO * 4 + TOTALFAT * 9 + TOTALPRO * 4);
  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <div className="form-group input-group">
            <div className="input-group-prepend"></div>
            <Select
              id="food"
              options={props.nameList}
              placeholder="select food"
              className="col-sm-12"
              onChange={handlePulldownInput}
            />
          </div>
        </div>
        <div>
          <div className="form-row">
            <div className="form-group input-group">
              <div className="input-group-prepend"></div>
              <input
                className="form-control"
                placeholder="amount(g)"
                name="amount"
                value={values.Amount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <input
                type="submit"
                value={"Save"}
                className="btn btn-success btn-block"
              />
            </div>
          </div>
        </div>
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Your Target calories(/day)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> kcal</td>
          </tr>
        </tbody>
      </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Protein (4kcal/g)</th>
            <th>Fat (9kcal/g)</th>
            <th>Carbo (4kcal/g)</th>
            <th>Today's Total Calories</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(foodObjects).map((id) => {
            const food = foodObjects[id].food;
            const amount = foodObjects[id].amount;
            totalCarbo(food, amount);
            totalFat(food, amount);
            totalProtein(food, amount);
            totalcalories();
            console.log(TOTALCALORIES);
            return (
              <tr key={id}>
                <td>{TOTALPRO}</td>
                <td>{TOTALFAT}</td>
                <td>{TOTALCARBO}</td>
                <td>{TOTALCALORIES}</td>
              </tr>
            );
          })}
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
                {Object.keys(foodObjects).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{foodObjects[id].food}</td>
                      <td>{foodObjects[id].amount}</td>
                      <td>{times}</td>
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
    </React.Fragment>
  );
};

export default FoodHistory;
