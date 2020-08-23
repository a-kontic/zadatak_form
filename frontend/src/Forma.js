import React, { useState, useEffect } from "react";
import { setValues } from "./actionSetValues";
import { setValid } from "./actionSetValid";
import { connect } from "react-redux";
import "./forma.css";

function Form(props) {
  const [errors, setErrors] = useState({
    firstName: "required",
    lastName: "required",
    address: "required",
    phone: "required",
    email: "required",
    accept: "Please Tick Above to Agree Terms & Conditions",
    password: "required",
  });

  function inputErrors(event) {
    const { name, value, checked } = event.target;
    const phoneRegex = RegExp(/^(\+)+(\d{10})$/);
    const emailRegex = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (name !== "accept") {
      if (value.length < 1) {
        setErrors({ ...errors, [name]: "required" });
      } else {
        setErrors({ ...errors, [name]: "" });

        if (name == "phone" && !phoneRegex.test(value)) {
          setErrors({ ...errors, [name]: "Bad format" });
        } else if (name == "email" && !emailRegex.test(value)) {
          setErrors({ ...errors, [name]: "Bad format" });
        }
      }
    }

    if (name === "accept") {
      setErrors({
        ...errors,
        [name]: !checked ? "Please Tick Above to Agree Terms & Conditions" : "",
      });
    }
  }
  useEffect(() => {
    props.setValid(isValid(errors));
  });

  const isValid = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  function handleInputChange(event) {
    const { name, value, checked } = event.target;
    props.setValues(name === "accept" ? checked : value, name);
    inputErrors(event);
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <form noValidate method="POST" action="/saveData">
          <div class="firstName">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              id="firstName"
              value={props.formValues.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName.length > 0 && (
              <span id="spanName" className="errorMessage">
                {errors.firstName}
              </span>
            )}
          </div>
          <div className="lastName">
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              id="lastName"
              value={props.formValues.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName.length > 0 && (
              <span className="errorMessage">{errors.lastName}</span>
            )}
          </div>
          <div className="address">
            <input
              type="text"
              placeholder="Address"
              name="address"
              id="address"
              value={props.formValues.address}
              onChange={handleInputChange}
            />
            {errors.address.length > 0 && (
              <span className="errorMessage">{errors.address}</span>
            )}
          </div>
          <div className="phone">
            <input
              type="text"
              placeholder="Phone number"
              name="phone"
              id="phone"
              value={props.formValues.phone}
              onChange={handleInputChange}
            />
            {errors.phone.length > 0 && (
              <span className="errorMessage">{errors.phone}</span>
            )}
          </div>
          <div className="email">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              id="email"
              value={props.formValues.email}
              onChange={handleInputChange}
            />
            {errors.email.length > 0 && (
              <span className="errorMessage">{errors.email}</span>
            )}
          </div>
          <div className="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={props.formValues.password}
            />
            {errors.password.length > 0 && (
              <span className="errorMessage">{errors.password}</span>
            )}
          </div>
          <div className="accept">
            <input
              type="checkbox"
              name="accept"
              id="accept"
              onChange={handleInputChange}
              checked={props.formValues.accept}
            />
            <label htmlFor="accept">I agree to the Terms and Conditions </label>
            {errors.accept.length > 0 && (
              <span className="errorMessage">{errors.accept}</span>
            )}
          </div>
          <div className="submit">
            <button disabled={!props.valid} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    formValues: state.formValues,
    valid: state.valid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValues: (value, name) => dispatch(setValues(value, name)),
    setValid: (value) => dispatch(setValid(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
