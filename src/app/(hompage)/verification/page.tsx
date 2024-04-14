"use client";
import { useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  Suspense,
  useReducer,
  useState,
} from "react";
import Button from "~/app/_components/ui/button";
import Card from "~/app/_components/ui/card";
import { api } from "~/trpc/react";

// interface stateProps {
//   otp: [string];
// }
// interface actionProps {
//   value: string;
//   index: number;
// }
// const otpReducer = (state: stateProps, action: actionProps) => {
//   switch (action.index) {
//     case 0:
//       return;
//   }
// };
const VerficationPage = () => {
  // const [state, dispatch] = useReducer(otpReducer, {
  //   otp: [],
  // });
  const searchParams = useSearchParams();

  const { mutate } = api.auth.verifyOtp.useMutation();
  const [otp, setOtp] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = searchParams.get("token");
    if (token) {
      mutate({ otp, token });
    }
  };
  return (
    <Suspense>
      <div className="mt-8 flex justify-center">
        <Card heading="Verify your email">
          <p className="text-center">
            Enter the 8 digit code you have received on
          </p>
          <div>
            <form
              onSubmit={(event) => handleSubmit(event)}
              method="post"
              className="flex flex-col space-y-4"
            >
              <div className="flex flex-col space-y-16">
                <div className="mx-auto flex w-full flex-row items-center justify-between">
                  {/* {otpInput.map((otpInp) => ( */}
                  {/* <div className="h-12 w-12 " key={otpInp}> */}
                  <input
                    className="border-gray-200 focus:bg-gray-50 flex h-full w-full appearance-none flex-col items-center justify-center rounded-xl border bg-white  text-center text-xl outline-none ring-black focus:ring-1"
                    type="text"
                    // name={otpInp + "otp"}
                    value={otp}
                    maxLength={8}
                    onChange={(e) => {
                      const value = e.target.value;
                      setOtp(value);
                    }}
                    // id={otpInp + "otp"}
                  />
                  {/* </div> */}
                  {/* ))} */}
                </div>
              </div>
              <Button type="submit" variant="lg">
                Create Account
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Suspense>
  );
};

export default VerficationPage;
