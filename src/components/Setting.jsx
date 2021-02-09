import React, { useState } from "react";
import Select from "react-select";
import Caliculation from "./caliculate";

export default function Setting() {
  const [gender, setGender] = useState("default");
  const [weight, setWeight] = useState("default");
  const [height, setHeight] = useState("default");
  const [excercise, setExcercise] = useState("default");

  const onGenderInput = (value) => {
    setGender(value);
  };

  const onWeightInput = (e) => {
    setWeight(e.target.value);
  };

  const onHeightInput = (e) => {
    setHeight(e.target.value);
  };

  const onExcerciseInput = (value) => {
    setExcercise(value);
  };
  const caliculateCalories = weight * 22;
  let total;
  if (excercise.value === "1") {
    total = Math.floor(caliculateCalories * 1.5);
  }
  if (excercise.value === "2") {
    total = Math.floor(caliculateCalories * 1.7);
  }
  if (excercise.value === "3") {
    total = Math.floor(caliculateCalories * 1.9);
  }
  if (excercise.value === "4") {
    total = Math.floor(caliculateCalories * 2.1);
  }
  const click = () => {
    console.log(excercise.value);
  };

  const option = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const option2 = [
    { value: "1", label: "1. Low - Only desk Work" },
    { value: "2", label: "2. Middle - Desk work & Walking(1h)" },
    { value: "3", label: "3. High - Have some excercise habit" },
    { value: "4", label: "4. Super high - Excercise every day" },
  ];
  return (
    <div className="setting">
      <h1>Setting</h1>
      <input type="number" placeholder="weight" onChange={onWeightInput} />
      <input type="number" placeholder="height" onChange={onHeightInput} />
      <Select
        placeholder="Select Gender"
        options={option}
        onChange={onGenderInput}
      />
      <Select
        placeholder="Select Excercise Frequency"
        options={option2}
        onChange={onExcerciseInput}
      />
      <input
        type="button"
        value="Caliculate your needed calorie"
        onClick={click}
      />
      <h1>Your BasedCalories are {caliculateCalories} kcal</h1>
      <h2>Your Total Calories burned are {total} kcal</h2>
    </div>
  );
}
