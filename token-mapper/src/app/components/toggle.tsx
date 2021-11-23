import React, { useState } from "react";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className={`switch ${isOn && "active"}`} onClick={toggleSwitch}>
      <input type="checkbox" id="toggle" />
      <label></label>
    </div>
  );
}
