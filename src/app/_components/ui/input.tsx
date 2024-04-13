import React, { ChangeEvent, useReducer } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  validationSchema: any;
}

interface stateProps {
  value: string;
  error: string;
}
interface actionProps {
  type: "SET_VALUE" | "SET_ERROR";
  payload: string;
}

const inputReducer = (state: stateProps, action: actionProps) => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        value: action.payload,
        error: "",
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

const Input: React.FC<InputProps> = ({
  label,
  name,
  validationSchema,
  ...props
}) => {
  const [state, dispatch] = useReducer(inputReducer, { value: "", error: "" });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    dispatch({ type: "SET_VALUE", payload: newValue });
    // try {
    //   validationSchema.parse({ [name]: newValue });
    //   dispatch({ type: "SET_ERROR", payload: "" });
    // } catch (error) {
    //   dispatch({ type: "SET_ERROR", payload: error.errors[0].message });
    // }
  };
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        className="ring-border appearance-none rounded px-4 py-2 outline-none ring-1"
        value={state.value}
        onChange={handleInputChange}
        {...props}
      />
    </div>
  );
};

export default Input;
