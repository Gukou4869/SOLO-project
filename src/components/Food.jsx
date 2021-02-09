import React, { useState, useEffect } from "react";
import { Form, Col, Jumbotron, Button } from "react-bootstrap";
import axios from "axios";
import "./Food.css";
import Select from "react-select";

const Food = (props) => {
  const [list, setList] = useState([]);
  const [food, setFood] = useState("");
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

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>FOOD</Form.Label>
            <Select options={nameList} onChange={handleChangeName} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>AMOUNT</Form.Label>
            <Form.Control />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitCal}>
            Submit
          </Button>
        </Form.Row>
      </div>
    </React.Fragment>
  );
};

export default Food;
