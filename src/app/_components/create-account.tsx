"use client";
import React, { useReducer } from "react";
import Card from "./ui/card";
import Button from "./ui/button";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface State {
  name: string;
  email: string;
  password: string;
  error: string;
}

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string };

const initialState: State = {
  name: "",
  email: "",
  password: "",
  error: "",
};

const createAccountReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
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
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const CreateAccount: React.FC = () => {
  const [state, dispatch] = useReducer(createAccountReducer, initialState);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: event.target.name as Action["type"],
      payload: event.target.value,
    });
  };

  const { mutate } = api.auth.sendOTP.useMutation({
    onSuccess(data, variables, context) {
      console.log(data);
      router.push(`/verification?token=${data?.token}`);
    },
    onError(error) {
      dispatch({ type: "SET_ERROR", payload: "Some Error Occured" });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(state);
  };

  return (
    <Card
      heading="Create your account"
      className="flex flex-col space-y-6 pb-24"
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="SET_NAME">Name</label>
          <input
            className="block  w-full  rounded px-4 py-2 ring-1 ring-border"
            type="text"
            name="SET_NAME"
            value={state.name}
            placeholder="Your Name"
            onChange={handleChange}
          />
        </div>
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
          <input
            className="block  w-full  rounded px-4 py-2 ring-1 ring-border"
            type="password"
            name="SET_PASSWORD"
            placeholder="Your Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        {state.error && (
          <div className="my-4 text-sm text-red-500">{state.error}</div>
        )}
        <Button type="submit" variant="lg">
          Create Account
        </Button>
      </form>

      <div className="flex justify-center gap-2">
        <span>Have an Account?</span>
        <Link
          href="/login"
          className="hover:underline hover:underline-offset-2"
        >
          <span className="font-medium">LOGIN</span>
        </Link>
      </div>
    </Card>
  );
};

export default CreateAccount;
