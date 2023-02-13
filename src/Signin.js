import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [loginpassword, setLoginPassword] = useState();
  const user = localStorage.getItem("galleryprofile");

  if (user) {
    navigate("/");
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/user/signin", {
        email: email,
        password: loginpassword,
      })
      .then((res) => {
        toast("Login Success");
        localStorage.setItem("galleryProfile", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((error) => {
        console.log("An error occured");
      });
    setEmail("");
    setLoginPassword("");
  };
  return (
    <>
      <Header isuser={user ? true : false} />
      <div className="container text-center">
        <ToastContainer />
        <div style={{ padding: "50px" }}>
          <form>
            <div
              className="text-center"
              style={{
                width: "400px",
                display: "inline-block",
                padding: "5px",
              }}
            >
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="form-control"
                placeholder="E-mail"
              ></input>
            </div>
            <br />
            <div
              className="text-center"
              style={{
                width: "400px",
                display: "inline-block",
                padding: "5px",
              }}
            >
              <input
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
                value={loginpassword}
                className="form-control"
                placeholder="Password"
              ></input>
            </div>
            <div>
              <a href="/signup" style={{ padding: "5px" }}>
                New here? click to Sign Up
              </a>
            </div>

            <br />
            <button
              onClick={(e) => handleSubmitLogin(e)}
              className="btn btn-primary pa-10"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
