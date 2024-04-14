import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Interest from "~/app/_components/interest";
import { api } from "~/trpc/server";

const InterestPage = async () => {
  const tokenCookie = cookies().get("auth-token");

  let tokenIsValid;
  if (tokenCookie) {
    tokenIsValid = await api.auth.verifyToken({
      token: tokenCookie.value,
    });
    if (!tokenIsValid) {
      redirect("/login");
    }
  } else {
    redirect("/login");
  }
  return (
    <div className="mt-8 flex items-center justify-center">
      <Interest token={tokenCookie.value} />
    </div>
  );
};

export default InterestPage;
