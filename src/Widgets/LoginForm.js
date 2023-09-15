import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const context = useContext(UserContext);
  const { registerUser, login } = context;
  const token = localStorage.getItem("token");
  const [registerPage, setRegisterPage] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const initialValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const initialValueLogin = {
    email: "",
    password: "",
  };

  const [loginInputs, setLoginInputs] = useState(initialValueLogin);
  const [registerInputs, setRegisterInputs] = useState(initialValueRegister);
  const [confirmPassword, setConfirmPassword]=useState("")
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (registerPage) {
      setRegisterInputs((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    } else {
      setLoginInputs((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const validateInputs = (inputs) => {
    let errors = {};
    if (registerPage) {
      if (inputs.firstName.length < 5) {
        errors.firstName = "First name is too short";
      }
      if (inputs.lastName.length < 5) {
        errors.lastName = "Last name is too short";
      }
      if(confirmPassword !== inputs.password){
        errors.confirmpassword = "Both passwords must be same";
      }
    }
    if (inputs.email.length <= 10) {
      errors.email = "Enter a valid e-mail id";
    }
    if (inputs.password.length <= 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerPage) {
      setErrors(validateInputs(registerInputs));
      setSubmitting(true);
    } else {
      setErrors(validateInputs(loginInputs));
      setSubmitting(true);
    }
  };

  const finishSubmit = () => {
    if (registerPage) {
      registerUser(registerInputs);
      setRegisterPage(false);
      setRegisterInputs(initialValueRegister);
    } else {
      login(loginInputs);
      setLoginInputs(initialValueLogin);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  const handlePage = () => {
    setRegisterPage(!registerPage);
  };

  const handleConfirmPassword=(e)=>{
    setConfirmPassword(e.target.value)
    if(e.target.value !== registerInputs.password){
      setErrors((prev)=>{
        return {...prev, [e.target.name] : "Both passwords must be same"}
      })
    }else{
      delete errors[e.target.name]
    }
  }

  return (
    <div className="flex justify-center w-full">
      {registerPage ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center w-full"
        >
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            value={registerInputs.firstName}
            onChange={handleChange}
            className="border flex w-1/4"
          />
          {errors.firstName && (
            <label htmlFor="firstName">**{errors.firstName}</label>
          )}

          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            value={registerInputs.lastName}
            onChange={handleChange}
            className="border flex w-1/4"
          />
          {errors.lastName && (
            <label htmlFor="lastName">**{errors.lastName}</label>
          )}

          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            value={registerInputs.email}
            onChange={handleChange}
            className="border flex w-1/4"
          />
          {errors.email && <label htmlFor="email">**{errors.email}</label>}

          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={registerInputs.password}
            className="border flex w-1/4"
          />
          {errors.password && (
            <label htmlFor="password">**{errors.password}</label>
          )}

          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="text"
            name="confirmpassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className="border flex w-1/4"
          />
          {errors.confirmpassword && (
            <label htmlFor="confirmpassword">**{errors.confirmpassword}</label>
          )}

          <button type="submit" className="flex border w-1/4 bg-slate-500">
            Submit
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center w-full"
        >
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            value={loginInputs.email}
            onChange={handleChange}
            className="border flex w-1/4"
          />
          {errors.email && <label htmlFor="email">**{errors.email}</label>}

          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={loginInputs.password}
            className="border flex w-1/4"
          />
          {errors.password && (
            <label htmlFor="password">**{errors.password}</label>
          )}

          <button type="submit" className="flex border w-1/4 bg-slate-500">
            Submit
          </button>
        </form>
      )}

      <button onClick={handlePage}>change</button>
    </div>
  );
};

export default LoginForm;
