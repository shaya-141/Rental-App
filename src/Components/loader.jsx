import React from "react";
import { ClipLoader } from "react-spinners";

function LoaderComponent({ size = 20, color = "#ffffff" }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ClipLoader color={color} loading={true} size={size} />
    </div>
  );
}

export default LoaderComponent;