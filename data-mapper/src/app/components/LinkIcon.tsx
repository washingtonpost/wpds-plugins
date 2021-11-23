import React from "react";

export default function LinkIcon(props) {
  return (
    <svg
      className={`${props.className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Link</title>
      <path
        d="M4.4 6.43a3.73 3.73 0 015.93.87l-.61.62c-.19.19-.44.3-.7.31a2.14 2.14 0 00-3.5-.68l-2.3 2.31a2.13 2.13 0 000 3.04 2.13 2.13 0 003.03 0l1.19-1.19a5.04 5.04 0 002.01.23l-2.08 2.08A3.73 3.73 0 112.1 8.74zm4.23-4.22a3.73 3.73 0 015.28 5.28l-2.31 2.3a3.73 3.73 0 01-5.93-.86l.61-.62c.2-.18.44-.3.7-.3a2.13 2.13 0 003.5.68v-.01l2.3-2.31a2.13 2.13 0 000-3.04 2.13 2.13 0 00-3.03 0L8.57 4.51a4.82 4.82 0 00-2.03-.22z"
        fill="#666666"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}
