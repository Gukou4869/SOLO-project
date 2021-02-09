import React, { useState, useEffect } from "react";
import { Form, Col, Jumbotron, Button } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import knex from "../../server/knex";

import "./Food.css";
const Food = (props) => {
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
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>AMOUNT</Form.Label>
            <Form.Control />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Row>
      </div>
    </React.Fragment>
  );
};

export default Food;
