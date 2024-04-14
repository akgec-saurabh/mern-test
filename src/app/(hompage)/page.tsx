import Link from "next/link";

export default async function Home() {
  // for (const i of data) {
  //   console.log(i);
  //   await db.interest.create({
  //     data: {
  //       name: i,
  //     },
  //   });
  // }
  return (
    <div className="container my-8 flex flex-col space-y-2">
      <Link
        className="text-[24px] font-medium hover:underline hover:underline-offset-2"
        href="sign-up"
      >
        Sign Up
      </Link>
      <Link
        className="text-[24px] font-medium hover:underline hover:underline-offset-2"
        href="login"
      >
        Login
      </Link>
      <Link
        className="text-[24px] font-medium hover:underline hover:underline-offset-2"
        href="interest"
      >
        Interest
      </Link>
    </div>
  );
}
