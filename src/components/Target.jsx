import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./Target.css";

const Target = (props) => {
  const BasedCalories = () => {
    const persons = props.person;
    const checkWeight = persons[props.user].weight;
    return checkWeight * 22;
  };
  const kcal = BasedCalories();

  const TotalCalories = () => {
    const persons = props.person;
    const checkExcerciseFrequency = persons[props.user].excerciseFrequency;
    console.log(persons[props.user].excerciseFrequency);
    if (checkExcerciseFrequency === "1. Low - Only desk Work") {
      return kcal * 1.5;
    } else if (
      checkExcerciseFrequency === "2. Middle - Desk work & Walking(1h)"
    ) {
      return kcal * 1.7;
    } else if (
      checkExcerciseFrequency === "3. High - Have some excercise habit"
    ) {
      return kcal * 1.9;
    } else if (
      checkExcerciseFrequency === "4. Super high - Excercise every day"
    ) {
      return kcal * 2.1;
    }
  };

  const total = Math.floor(TotalCalories());

  const proteinCal = () => {
    const persons = props.person;
    const checkWeight = persons[props.user].weight;
    if (props.goal === 1) {
      return checkWeight * 1.8;
    } else if (props.goal === 2) {
      return checkWeight * 2.2;
    } else if (props.goal === 3) {
      return checkWeight * 2.4;
    } else if (props.goal === 4) {
      return checkWeight * 2.6;
    }
  };
  const Protein = Math.floor(proteinCal());

  const fatCal = () => {
    const persons = props.person;
    const checkWeight = persons[props.user].weight;
    if (props.goal === 1) {
      return Math.floor(checkWeight * 0.8);
    } else if (props.goal === 2) {
      return Math.floor(checkWeight * 0.7);
    } else if (props.goal === 3) {
      return Math.floor(checkWeight * 0.6);
    } else if (props.goal === 4) {
      return Math.floor(checkWeight * 0.5);
    }
  };
  const Fat = fatCal();

  const carboCal = () => {
    return (total - (Protein + Fat)) / 4;
  };

  const Carbo = Math.floor(carboCal());

  const TargetCal = () => {
    if (props.goal === 1) {
      return total + 60;
    } else if (props.goal === 2) {
      return total - 200;
    } else if (props.goal === 3) {
      return total - 400;
    } else if (props.goal === 4) {
      return total - 600;
    }
  };
  const TARGETCAL = TargetCal();

  const calDif = () => {
    if (props.goal === 1) {
      return "Plus Calories (+)";
    } else {
      return "Under Calories (-)";
    }
  };
  const CAL = calDif();

  const Dif = () => {
    return total - TARGETCAL;
  };
  let DIF;
  if (Dif() < 0) {
    DIF = -Dif();
  } else {
    DIF = +Dif();
  }

  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Total Calories Burned (/day)</th>
            <th>Target Calories (/day)</th>
            <th>{CAL}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{total} kcal</td>
            <td>{TARGETCAL} kcal</td>
            <td>{DIF} kcal</td>
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
          <tr>
            <td>{Protein}</td>
            <td>{Fat}</td>
            <td>{Carbo}</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default Target;
