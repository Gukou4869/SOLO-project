import React from "react";

export default function Caliculate(props) {
  const click = () => {
    console.log(props.onInputGender);
  };
  return (
    <div className="caliculate">
      <input type="button" onClick={click} />
      Your total calories you can intake today is
    </div>
  );
}
