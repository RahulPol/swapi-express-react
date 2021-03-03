import React from "react";
import { connect } from "react-redux";

import Logo from "../Logo/Logo";
import { login } from "../../actions/session";

import "./Login.css";

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
    <>
      <div className="login-container">
        <div className="logo-section">
          <Logo />
        </div>

        <div className="input-section">
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
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
