import React from "react";
import { styled, theme } from "../../stitches.config";
export default function IconButton({ onClick, isActive }) {
  function handleClick() {
    onClick();
  }
  const IconButton = styled("button", {
    width: "100%",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color .25s",
    borderStyle: "none",
    backgroundColor: "transparent",
    fill: theme.colors.primary,
    margin: 0,
    "&:hover": {
      backgroundColor: "#F0F0F0",
    },
    variants: {
      color: {
        blue: {
          backgroundColor: theme.colors.blue,
          fill: "White",
          "&:hover": {
            backgroundColor: theme.colors.blue,
          },
        },
        disabled: {
          backgroundColor: "#E9E9E9",
        },
        default: {
          backgroundColor: "transparent",
        },
      },
    },
  });
  return (
    <IconButton color={isActive ? "blue" : "default"} onClick={handleClick}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1.5C0 2.328.672 3 1.5 3 2.328 3 3 2.328 3 1.5 3 .672 2.328 0 1.5 0 .672 0 0 .672 0 1.5zm6 0C6 2.328 6.672 3 7.5 3 8.328 3 9 2.328 9 1.5 9 .672 8.328 0 7.5 0 6.672 0 6 .672 6 1.5zM7.5 9C6.672 9 6 8.328 6 7.5 6 6.672 6.672 6 7.5 6 8.328 6 9 6.672 9 7.5 9 8.328 8.328 9 7.5 9zM0 7.5C0 8.328.672 9 1.5 9 2.328 9 3 8.328 3 7.5 3 6.672 2.328 6 1.5 6 .672 6 0 6.672 0 7.5z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </IconButton>
  );
}
