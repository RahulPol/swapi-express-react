import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
  errors,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});

const Login = ({ errors, login }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: e.target[0].value,
      birthYear: e.target[1].value,
    };

    login(user);
  };

  return (
    // TODO: convert uncontrolled components to controlled components
    <>
      <h1>Login</h1>
      <p>{errors}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Birth Year:
          <input type="text" name="birthYear" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Link to="/">Welcome</Link>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
