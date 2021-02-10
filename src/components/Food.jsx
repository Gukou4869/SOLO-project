import React, { useState, useEffect } from "react";
import { Form, Col, Jumbotron, Button } from "react-bootstrap";
import axios from "axios";
import "./Food.css";
import Select from "react-select";
import FoodHistory from "./FoodHistory";
import Setting from "./Setting";

const Food = (props) => {
  const [list, setList] = useState([]);
  const [food, setFood] = useState("");
  const [amount, setAmount] = useState(0);
  const nameList = [];
  useEffect(() => {
    const api = axios.create({
      baseURL: `http://localhost:3000/api/caloriecaliculator/foodtype`,
    });
    api.get("/").then((res) => {
      setList(res.data);
      console.log(list);
    });
  }, []);
  list.forEach((x) => {
    const obj = { name: x.name, label: x.name };
    nameList.push(obj);
  });

  const handleChangeName = (e) => {
    setFood(e.name);
    console.log(food);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
    console.log(amount);
  };

  const submitCal = () => {
    console.log(food);
  };

  return (
    <React.Fragment>
      <div className="Food">
        <Jumbotron>
          <h1>Let's caliculate!</h1>
          <p>
            This is a simple calolie caliculator, please input food and amount
            that you ate today.
          </p>
        </Jumbotron>
        <Setting />
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>FOOD</Form.Label>
            <Select options={nameList} onChange={handleChangeName} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>AMOUNT(g)</Form.Label>
            <Form.Control onChange={handleChangeAmount} />
          </Form.Group>
        </Form.Row>
      </div>
      <FoodHistory food={food} amount={amount} />
    </React.Fragment>
  );
};

export default Food;
