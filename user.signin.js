import React, { useState } from "react";
import axios from "axios";
import Footer from "../footer.component";

import { Redirect, Link } from "react-router-dom";
import MyGlobleSetting from "../MyGlobleSetting";




// Setting states

const UserSignin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "1",
    flag: "",
    status: "",
    message: "",
    user_id: "",
    didRedirect: false,
  });

  const { email, password, flag, message, role, status, didRedirect } = values;


  // Handle change function

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  // Post data Api Hit

  const postData = (event) => {
    event.preventDefault();
    setValues({ ...values });

    const data = {
      email,
      password,
      role,
      flag,
      message,
      status,
    };

    var apiurl = MyGlobleSetting.APIurl;
    axios
      .post(apiurl + "userLogin", data)
      .then((response) => {
        console.log(response);
        console.log(response.data.flag);

        if (response.data.flag == "false") {
          setValues({
            ...values,
            role: "1",
            message: response.data.message,
            flag: response.data.flag,
            status: response.data.status,
            user_id: response.data.user_id,
          });
        } else {
          console.log("Data else " + response.data.user_id);

          authenticate(response, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              didRedirect: true,
              user_id: response.data.user_id,
              status: response.data.status,
              message: response.data.message,
            });
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // Redicrection after successfull Sign in

  const performRedirect = () => {
    console.log("didRedirect:" + didRedirect);
    if (didRedirect) {
      if (role === "2") {
        return <Redirect to="/usedcar" />;
      } else {
        return <Redirect to="/usersignin" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/usedcar" />;
    } else {
      return <Redirect to="/usersignin" />;
    }
  };

  //  Authentication middleware

  const authenticate = (response, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_id", JSON.stringify(response.data.user_id));
      localStorage.setItem(
        "user_navigation",
        JSON.stringify(response.data.role)
      );
      next();
    }
  };

  // Checking Authentication

  const isAutheticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("user_id")) {
      return JSON.parse(localStorage.getItem("user_id"));
    } else {
      return false;
    }
  };
  

  // error message function

  const loadOrShowMsg = () => {
    console.log("mymessage : " + status);

    if (status == "200 OK") {
      return (
        <div className="row">
          <div className="col-md-12 text-left p-0 mt-3">
            <div
              className="alert alert-success"
              style={{ display: status ? "" : "block" }}
            >
              {message}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-12 text-left p-0 mt-3">
            <div
              className="alert alert-danger"
              style={{ display: flag ? "" : "none" }}
            >
              {message}
            </div>
          </div>
        </div>
      );
    }
  };


  // User sign in form

  const usersignInForm = () => {
    return (
      <div>
        <div className="container-fluid p-0 section-signup">
          <div className="row">
            <div className="col-sm-4 signup-cont mb-4">
              <div className="form-header signin text-center mb-4">
                <h4>Login with</h4>
              </div>
              <div className="form-social-btn text-center">
                <button className="btn btn-default btn-facebook mr-3">
                  Facebook
                </button>
                <button className="btn btn-default btn-google">Google</button>
              </div>
              <div className="form-divider text-center mb-3 mt-3">
                <i>or</i>
              </div>
              <div className="form-body mb-4 mt-4">
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleChange("email")}
                      value={email}
                      id="email"
                      name="email"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleChange("password")}
                      value={password}
                      id="pwd"
                      name="password"
                      placeholder="Password"
                      required
                      minlength="4"
                      maxLength="14"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="hidden"
                      onChange={handleChange("role")}
                      value={role}
                      className="form-control"
                      id="roleid"
                      name="role"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={postData}
                    className="btn btn-default btn-submit w-100"
                  >
                    Login
                  </button>
                </form>

                {loadOrShowMsg()}

                {performRedirect()}

                <div className="w-100 signin-link mb-5 mt-3">
                  <div className="form-group">
                    <label className="" id="ligin-label">
                      Don't have any account yet?
                    </label>
                    <Link
                      to={"/user/signup"}
                      className="nav-link"
                      class="btn btn-default"
                      id="ligin-btn"
                      role="button"
                      aria-pressed="true"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  };

  return usersignInForm();
};

export default UserSignin;
