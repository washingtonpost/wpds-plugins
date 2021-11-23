import React, { useState } from "react";

export default function btn(props) {
  const [isDown, setisDown] = useState(false);
  return (
    <button
      onMouseUp={() => setisDown(false)}
      onMouseDown={() => setisDown(true)}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`btn ${
        !isDown && "card-shadow"
      } flex justify-center items-center`}
    >
      {" "}
      {props.children}
    </button>
  );
}
