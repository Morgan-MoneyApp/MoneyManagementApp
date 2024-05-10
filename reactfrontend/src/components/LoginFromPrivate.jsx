import React, {useState} from "react";
import '../styles/LoginPriv.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const API_URL = "http://localhost:8080/api/authenticate";

export default function LoginFromPrivate() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: ""
  });

  const handleLoginFormSubmission = (e) => {
    e.preventDefault();
    console.log(input.username, input.password);
    if (input.username !== "" && input.password) {
      // console.log("posting");
      axios.post(API_URL, {username: input.username, password: input.password, rememberMe: false})
        .then(res => res.data)
        .then(res => localStorage.setItem("id_token", "Bearer " + res["id_token"]))
        .catch(reason => {
          let resp = reason.response;
          if (resp.status === 400) {
            alert("invalid");
          } else if (resp.status === 401) {
            alert(resp.data.detail);
          }
        });
      if (localStorage.getItem("id_token")) {
        navigate("/accounts")
      }
      return;
    }
    alert("invalid")
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(input);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleLoginFormSubmission}>
        <label>
          <p>Username</p>
          <input name="username" type="text" className="align-custom" onChange={handleInput}/>
        </label>
        <label>
          <p>Password</p>
          <input name="password" type="password" className="align-custom" onChange={handleInput}/>
        </label>
        <div>
          <button type="submit" className="align-custom" onClick={handleInput}>Submit</button>
        </div>
      </form>
    </div>
  )
}
