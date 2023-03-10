import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const baseUrl = "https://songiefest-be.herokuapp.com";
  const DefaultLoginState = {
    username: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(DefaultLoginState);

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const handleLoginClick = () => navigate("/explore");
  function loginApi() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const token = "Token " + cookieValue;

    console.log(document.cookie);

    axios
      .post(
        `${baseUrl}/login/`,
        {
          username: loginData.username,
          password: loginData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        console.log("login data from API", response.data);
        handleLoginClick();
      })
      .catch((error) => {
        console.log("Error status", error.response.status);
        console.log("Error data", error.response.data);
        const errorContainer = document.getElementById("loginError");
        errorContainer.innerHTML = error.response.data["response"];
      });
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="username"
            placeholder="Enter Username"
            value={loginData.username}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="off"
            value={loginData.password}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <label id="loginError"> </label>
        <br></br>
        <Button type="submit" variant="primary" onClick={loginApi}>
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New User? <Link to="/register">Register Here!</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginForm;
