
import React from 'react';
import { useForm } from "react-hook-form";  // Correct import for useForm
import "./Signup.css"
import axios from "axios"
import {useState} from "react"
import { useNavigate } from 'react-router-dom';

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  let [err,setErr]=useState("")
  let navigate=useNavigate()

  async function handleSubmitForm(userObj){

    //http post req to user-api
    if(userObj.usertype==="user"){
    const res=await axios.post("http://localhost:4000/user-api/user",userObj)
    console.log(res)
    if(res.data.message==="User Created")
    {
      //navigate to signup
      navigate("/signin")
    }
    else
      //error
    setErr(res.data.message)
  }
  if(userObj.usertype==="author"){
    const res=await axios.post("http://localhost:4000/author-api/user",userObj)
    console.log(res)
    if(res.data.message==="Author Created")
    {
      //navigate to signup
      navigate("/signin")
    }
    else
      //error
    setErr(res.data.message)
  }

  }

  
  return (
    <div className="signup">
      {/*User register error message*/}
      {err.length!==0 && <p className="text-danger text-center">{err}</p>}
      <h1 className="display-6 text-center p-2">SIGN UP</h1>
      <form className="w-50 mx-auto m-4 card" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className='card-body form'>
     
        <label htmlFor="usertype"  className="fs-3 pe-5 mb-4">Register as</label>

        <input type="radio" name="usertype" id="user" value="user" className="fs-5"{...register("usertype", { required: true })} />
          <label htmlFor="user" className="fs-5 p-2">User</label>  
              
        <input type="radio" name="usertype" id="author"  value="author" className="fs-5" {...register("usertype", { required: true })} />
        <label htmlFor="author" className="fs-5 p-2">Author</label>   
        <br />
        {errors.usertype && (
          <p className="text-warning mb-3 fs-6 lead">Please select a user type</p>
        )}

        <label htmlFor="username" className="fs-3 pb-2">Username</label>
        <input 
          type="text" 
          className="form-control mb-3" 
          id="username" 
          placeholder="Username" 
          {...register("username", { required: true, minLength: 3, maxLength: 20 })}
        />
        {/* Print errors */}
        {errors.username?.type === "required" && (
          <p className="text-warning mb-3 fs-6 lead">Username is mandatory</p>
        )}
        {errors.username?.type === "minLength" && (
          <p className="text-warning mb-3 fs-6 lead">Minimum length must be 3</p>
        )}
        {errors.username?.type === "maxLength" && (
          <p className="text-warning mb-3 fs-6 lead">Maximum length must be less than 20</p>
        )}

        <label htmlFor="password" className="fs-3 pb-2 pt-3">Password</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          className="form-control mb-3" 
          placeholder="Password" 
          {...register("password", { required: true })}
        />
        
        {errors.password && (
          <p className="text-warning fs-6 lead">Password is mandatory</p>
        )}

        <label htmlFor="email" className="fs-3 pb-2 pt-3">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          className="form-control mb-3" 
          placeholder="Email" 
          {...register("email", { required: true })}
        />

        {errors.email && (
          <p className="text-warning fs-6 lead">Email is mandatory</p>
        )}

        <button type="submit" className="btn btn-success button d-block mx-auto p-1 fs-5 ps-4 pe-4 mt-3">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
