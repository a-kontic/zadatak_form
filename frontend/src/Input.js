import React from "react";

const Input = ({ errMess, ...props }) => (
  <div className="input-text">
    <input {...props} />
    {errMess && <span className="errorMessage">{errMess}</span>}
  </div>
);

export default Input;
