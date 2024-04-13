"use client";
import React, { useReducer, useState } from "react";
import Card from "./ui/card";
import Button from "./ui/button";
import Link from "next/link";

interface State {
  email: string;
  password: string;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string };

const initialState: State = {
  email: "",
  password: "",
};

const LoginReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};

const Login: React.FC = () => {
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: event.target.name as Action["type"],
      payload: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Form submitted with state:", state);
  };

  return (
    <Card heading="Login" className="flex flex-col space-y-6 pb-24">
      <div className="my-2 space-y-1 text-center">
        <h2 className="text-[24px] font-medium">Welcome back to ECOMMERCE</h2>
        <p>The next gen business marketplace</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="SET_EMAIL">Email</label>
          <input
            className="block  w-full  rounded px-4 py-2 ring-1 ring-border"
            type="text"
            name="SET_EMAIL"
            value={state.email}
            placeholder="Your Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="SET_PASSWORD">PASSWORD</label>
          <div className="relative">
            <input
              className="block  w-full  rounded px-4 py-2 ring-1 ring-border"
              type={showPassword ? "text" : "password"}
              name="SET_PASSWORD"
              placeholder="Your Password"
              value={state.password}
              onChange={handleChange}
            />
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-sm font-medium hover:underline hover:underline-offset-2"
              onClick={() => {
                setShowPassword((prv) => !prv);
              }}
            >
              SHOW
            </Button>
          </div>
        </div>
        <Button type="submit" variant="lg">
          Create Account
        </Button>
      </form>
      <div className="w-full border-t border-slate-200"></div>
      <div className="flex justify-center gap-2">
        <span>Don’t have an Account? </span>
        <Link
          href="/login"
          className="hover:underline hover:underline-offset-2"
        >
          <span className="font-medium">SIGN UP</span>
        </Link>
      </div>
    </Card>
  );
};

export default Login;
