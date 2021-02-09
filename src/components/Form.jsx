import React, { useState, useEffect } from "react";
import Select from "react-select";

const Form = (props) => {
  const initialFieldValues = {
    fullName: "",
    height: "",
    weight: "",
    gender: "",
    excerciseFrequency: "",
  };

  const option = [
    { type: "gender", value: "Male", label: "Male" },
    { type: "gender", value: "Female", label: "Female" },
  ];

  const option2 = [
    {
      type: "excerciseFrequency",
      value: "1",
      label: "1. Low - Only desk Work",
    },
    {
      type: "excerciseFrequency",
      value: "2",
      label: "2. Middle - Desk work & Walking(1h)",
    },
    {
      type: "excerciseFrequency",
      value: "3",
      label: "3. High - Have some excercise habit",
    },
    {
      type: "excerciseFrequency",
      value: "4",
      label: "4. Super high - Excercise every day",
    },
  ];
  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlePulldownInput = (e) => {
    const name = e.type;
    const value = e.value;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Height"
            name="height"
            value={values.height}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Weight"
            name="weight"
            value={values.weight}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-id-card"></i>
            </div>
          </div>
          <Select
            className="col-sm-11"
            options={option}
            name="gender"
            onChange={handlePulldownInput}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-id-card"></i>
            </div>
          </div>
          <Select
            className="col-sm-11"
            options={option2}
            name="excerciseFrequency"
            onChange={handlePulldownInput}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Save"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default Form;
