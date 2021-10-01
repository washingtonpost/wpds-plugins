import React, { useState } from "react";

export default function btn(props) {
  const [isDown, setisDown] = useState(false);
  return (
    <div
      onMouseUp={() => setisDown(false)}
      onMouseDown={() => setisDown(true)}
      onClick={props.onClick}
      className={`btn ${
        !isDown && "card-shadow"
      } flex justify-center items-center`}
    >
      {" "}
      {props.children}
    </div>
  );
}
