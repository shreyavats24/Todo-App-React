// import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';//use for redirecting pages 
import Cookies from 'js-cookie'; // use to set cookies 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
async  function checkCredential(e) {
        e.preventDefault();
        if (email.trim() != "" && password.trim() != "") {
            try {
              const res = await axios.post("http://localhost:8000/login",{email:email,password:password});
              console.log(res);
              if (res.data.message =="User Authenticated!!") {
                Cookies.set("mycookie",res.data.token);
                // console.log("success");
                navigate("/todo");//use to redirect page to /todo 
              }
              else if(res.data.message =="Already logged in"){
                navigate("/todo");
              }
              else if(res.data.message=="Invalid Credential!!!"){
                navigate("/login");
              }
              else if(res.data.message == "User Not found!!!"){
                navigate("/signup");
              }
              
            } catch (error) {
              console.log(error);
            }
          }
          else{
              alert("Please Enter the details properly!!!");
          }
    }
  function inputEmail(e) {
    setEmail(e.target.value);
  }
  function inputPassword(e){
    setPassword(e.target.value);
  }
  return (
    <>
    <div className="bg-white shadow-md rounded-lg p-8 w-96 m-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={checkCredential}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={email}
            onChange={inputEmail}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={inputPassword}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
        //   onClick={checkCredential()} 
        type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Dont have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
    </>
  );
}

export default Login;
