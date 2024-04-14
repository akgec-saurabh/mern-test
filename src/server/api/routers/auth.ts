import { sendOtp } from "lib/email";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface DecodedToken {
  email: string;
}

export const authRouter = createTRPCRouter({
  sendOTP: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const otp = await sendOtp(input.email);
      const hashOtp = bcrypt.hashSync(otp, 10);
      const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
      let hashPassword;
      try {
        hashPassword = bcrypt.hashSync(input.password, 10);
      } catch (error) {
        console.error("Error hashing password:", error);
      }
      if (hashPassword) {
        try {
          await ctx.db.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: hashPassword,
              otp: hashOtp,
              otpExpiry: expiryTime,
              verified: false,
            },
            select: {
              email: true,
              name: true,
            },
          });

          const payload = { email: input.email };
          const secretkey = process.env.SECRET_KEY;
          const token = jwt.sign(payload, secretkey!, { expiresIn: "1hr" });

          return { token };
        } catch (error) {
          console.log(error);
          throw Error("Some Error occured on Server");
        }
      }
    }),
  verifyOtp: publicProcedure
    .input(z.object({ otp: z.string().length(8), token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const secretkey = process.env.SECRET_KEY!;
      const tokenValid = jwt.verify(input.token, secretkey) as DecodedToken;

      if (!tokenValid) {
        return { message: "Error in token" };
      }
      const email = tokenValid?.email;

      const hashOtp = await ctx.db.user.findFirst({
        where: { email },
        select: {
          otp: true,
          otpExpiry: true,
        },
      });
      let otpIsValid;
      if (hashOtp) {
        otpIsValid = bcrypt.compareSync(input.otp, hashOtp.otp);
      }

      let token;
      if (otpIsValid) {
        const payload = { email };
        const secretkey = process.env.SECRET_KEY;
        token = jwt.sign(payload, secretkey!, { expiresIn: "1hr" });

        await ctx.db.user.update({
          where: { email },
          data: { verified: true },
        });
        return token;
      }

      return { error: "Error Occured" };
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(5) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { email: input.email },
        select: { password: true },
      });

      if (!user) {
        return { message: "Your are not Registered User", data: {} };
      }

      let isPasswordValid;
      if (user) {
        isPasswordValid = bcrypt.compareSync(input.password, user.password);
      }
      if (isPasswordValid) {
        const payload = { email: input.email };
        const secretkey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretkey!, { expiresIn: "1hr" });

        return { message: "You are logged in", data: { token } };
      } else {
        return { message: "Password is not Valid", data: {} };
      }
    }),
  verifyToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const secretkey = process.env.SECRET_KEY!;
      const tokenValid = jwt.verify(input.token, secretkey);
      if (tokenValid) {
        return true;
      }
    }),
});
