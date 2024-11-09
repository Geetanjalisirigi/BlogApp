import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Signin.css";
import { userLoginThunk } from "../../redux/slices/userLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { isPending, currentUser, errorStatus, errorMessage, loginStatus } =
    useSelector((state) => state.userLogin);

  async function handleSubmitForm(userCred) {
    let actionObj = userLoginThunk(userCred);
    dispatch(actionObj);
  }

  useEffect(() => {
    if (loginStatus === true) {
      if (currentUser.usertype === "user") navigate("/user-profile");
      if (currentUser.usertype === "author") navigate("/author-profile");
    }
  }, [loginStatus]);

  return (
    <div className="signup">
      <h1 className="display-6 text-center p-2">SIGN IN</h1>
      <form
        className="w-50 mx-auto m-4 card"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="card-body form-signin">
          <label htmlFor="usertype" className="fs-3 pe-5 mb-4">
            Login as
          </label>

          <input
            type="radio"
            name="usertype"
            id="user"
            value="user"
            className="fs-5"
            {...register("usertype", { required: true })}
          />
          <label htmlFor="user" className="fs-5 p-2">
            User
          </label>

          <input
            type="radio"
            name="usertype"
            id="author"
            value="author"
            className="fs-5"
            {...register("usertype", { required: true })}
          />
          <label htmlFor="author" className="fs-5 p-2">
            Author
          </label>
          <br />
          {errors.usertype && (
            <p className="text-danger mb-2 fs-6 lead">
              Please select a user type
            </p>
          )}

          <label htmlFor="username" className="fs-3 pb-2">
            Username
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="username"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {/* Print errors */}
          {errors.username?.type === "required" && (
            <p className="text-danger mb-3 fs-6 lead ">Username is mandatory</p>
          )}

          <label htmlFor="password" className="fs-3 pb-2 pt-3">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mb-2"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          {errors.password && (
            <p className="text-danger fs-6 lead">Password is mandatory</p>
          )}

          <button
            type="submit"
            className="btn btn-success button d-block mx-auto p-1 fs-5 ps-4 pe-4 mt-3"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
