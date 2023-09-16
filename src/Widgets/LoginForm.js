import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";

const LoginForm = () => {
  const context = useContext(UserContext);
  const { registerUser, login } = context;
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
  const [confirmPassword, setConfirmPassword] = useState("");

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
      if (confirmPassword !== inputs.password) {
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
  }, [errors]); // eslint-disable-line

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== registerInputs.password) {
      setErrors((prev) => {
        return { ...prev, [e.target.name]: "Both passwords must be same" };
      });
    } else {
      delete errors[e.target.name];
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-4 sm:w-1/3 p-2 rounded-2xl bg-sky-50 sm:h-4/5 overflow-hidden">
      <div className="flex justify-center p-2 w-full">
        <div className="flex relative justify-around items-center p-2 rounded-2xl bg-sky-900 w-3/4 sm:w-2/5 border z-10">
          <div
            className={`flex absolute w-2/5 h-2/3 rounded-xl bg-white ${
              registerPage
                ? "translate-x-14 sm:translate-x-1/2"
                : "left-4 sm:left-3"
            } -z-10 transition-all duration-200`}
          ></div>
          <div
            onClick={() => setRegisterPage(false)}
            className={`flex ${
              registerPage ? "text-sky-300" : "text-sky-800"
            } hover:cursor-pointer`}
          >
            Login
          </div>
          <div
            onClick={() => setRegisterPage(true)}
            className={`flex ${
              registerPage ? "text-sky-800" : "text-sky-300"
            } hover:cursor-pointer`}
          >
            Signup
          </div>
        </div>
      </div>
      {registerPage ? (
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-2 justify-center w-full p-2 ${registerPage ? "scale-x-100" : "sale-x-0"} origin-left duration-300`}
        >
          <div className="flex flex-col w-full p-2 relative">
            <label
              htmlFor="firstName"
              className="text-sky-900 text-lg font-medium"
            >
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={registerInputs.firstName}
              onChange={handleChange}
              className="border flex w-full rounded-lg p-1"
            />
            {errors.firstName && (
              <label
                htmlFor="firstName"
                className="flex absolute -bottom-2 left-4 text-xs text-red-500"
              >
                **{errors.firstName}
              </label>
            )}
          </div>

          <div className="flex flex-col w-full p-2 relative">
            <label
              htmlFor="lastName"
              className="text-sky-900 text-lg font-medium"
            >
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={registerInputs.lastName}
              onChange={handleChange}
              className="border flex w-full rounded-lg p-1"
            />
            {errors.lastName && (
              <label
                htmlFor="lastName"
                className="flex absolute -bottom-2 left-4 text-xs text-red-500"
              >
                **{errors.lastName}
              </label>
            )}
          </div>

          <div className="flex flex-col w-full p-2 relative">
            <label htmlFor="email" className="text-sky-900 text-lg font-medium">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              value={registerInputs.email}
              onChange={handleChange}
              className="border flex w-full rounded-lg p-1"
            />
            {errors.email && (
              <label
                htmlFor="email"
                className="flex absolute -bottom-2 left-4 text-xs text-red-500"
              >
                **{errors.email}
              </label>
            )}
          </div>

          <div className="flex flex-col w-full p-2 relative">
            <label
              htmlFor="password"
              className="text-sky-900 text-lg font-medium"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              value={registerInputs.password}
              className="border flex w-full rounded-lg p-1"
            />
            {errors.password && (
              <label
                htmlFor="password"
                className="flex absolute -bottom-2 left-4 text-xs text-red-500"
              >
                **{errors.password}
              </label>
            )}
          </div>

          <div className="flex flex-col w-full p-2 relative">
            <label
              htmlFor="confirmpassword"
              className="text-sky-900 text-lg font-medium"
            >
              Confirm Password
            </label>
            <input
              type="text"
              name="confirmpassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="border flex w-full rounded-lg p-1"
            />
            {errors.confirmpassword && (
              <label
                htmlFor="confirmpassword"
                className="flex absolute -bottom-2 left-4 text-xs text-red-500"
              >
                **{errors.confirmpassword}
              </label>
            )}
          </div>

          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="flex justify-center items-center rounded-xl w-3/4 p-2 bg-sky-900 text-sky-300 hover:bg-sky-700 hover:text-sky-200 duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-2 justify-center w-full h-4/5 ${registerPage ? "scale-x-0" : "scale-x-100"} origin-right duration-300`}
        >
          <div className="flex flex-col w-full p-2 relative">
            <label htmlFor="email" className="text-sky-900 text-lg font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={loginInputs.email}
              onChange={handleChange}
              className="border flex w-full rounded-lg p-1"
            />
            {errors.email && (
              <label
                htmlFor="email"
                className="flex absolute -bottom-2 left-4 text-xs text-red-500"
              >
                **{errors.email}
              </label>
            )}
          </div>

          <div className="flex flex-col w-full p-2 relative">
            <label
              htmlFor="password"
              className="text-sky-900 text-lg font-medium"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              value={loginInputs.password}
              className="border flex w-full rounded-lg p-1"
            />
            {errors.password && (
              <label
                htmlFor="password"
                className="flex absolute -bottom-2 left-4 text-xs text-red-500"
              >
                **{errors.password}
              </label>
            )}
          </div>

          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="flex justify-center items-center rounded-xl w-3/4 p-2 bg-sky-900 text-sky-300 hover:bg-sky-700 hover:text-sky-200 duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
