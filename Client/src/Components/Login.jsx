import React, { useState } from "react";
import { Authcontext } from "../Context/Authcontext";
import { useContext } from "react";



const Login = () => {

    const [logstate, setlogstate] = useState("Register")
    const [formdata, setformdata] = useState({
      username:"",
      email:"",
      password:""
    });
    const {userregister,userlogin}=useContext(Authcontext);
  
    const handleform=(e)=>{
      const {name,value}=e.target;
      setformdata({
        ...formdata,
        [name]:value
      });
    }
  const changeRegister=()=>{
    setlogstate("Register");
  }
  const changeLogin=()=>{
    setlogstate("Login");
  }
  const handlesubmit=async(e)=>{
    
    e.preventDefault();
    if(logstate==="Register")
      {
          userregister(formdata);
          setformdata({
            username:"",
            email:"",
            password:""
          });
          
          console.log("Register clicked");
      }
      else{
          userlogin(formdata)
          setformdata({
            username:"",
            email:"",
            password:""
          });
          
          console.log("login clicked");

      }
    
  }
  return (
    <div className="flex m-2 p-2 justify-center items-center flex-col bg-gray-900 h-[40rem]">
      <h1 className="m-2 p-2 text-[2rem] font-bold">This is login page</h1>
      <div className="bg-gray-200 m-2 p-2 rounded-md">
        <div className="flex justify-around items-center">
          <button type="button" className={`cursor-pointer m-1 p-2 rounded-lg ${logstate==="Register" ? 'bg-pink-500' : 'bg-blue-200 '}`} onClick={changeRegister}>Register</button>
          <button type="button" className={`cursor-pointer m-1 p-2 rounded-lg ${logstate==="Login" ? 'bg-pink-500' : 'bg-blue-200 '}`} onClick={changeLogin}>Login</button>
        </div>
        <form onSubmit={handlesubmit} className="m-2 p-2">
        {logstate==="Register"? <div className="username flex justify-center items-center">
            <label htmlFor="username" className="m-1 p-1 w-[5rem]">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="m-1 p-1"
              value={formdata.username}
              onChange={handleform}
            />
          </div>:<></>}
          
          <div className="email flex justify-center items-center">
            <label htmlFor="email" className="m-1 p-1 w-[5rem]">
              Email
            </label>
            <input type="email" name="email" id="email" className="m-1 p-1" value={formdata.email} onChange={handleform}/>
          </div>
          <div className="password flex justify-center items-center">
            <label htmlFor="password" className="m-1 p-1 w-[5rem]">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="m-1 p-1"
              value={formdata.password}
              onChange={handleform}
            />
          </div>

          <div className="submit flex justify-center items-center">
            <button type="submit" className="m-2 p-2 bg-purple-500 rounded-lg">
              {logstate}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
