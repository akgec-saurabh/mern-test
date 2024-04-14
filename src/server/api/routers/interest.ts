import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

interface DecodedToken {
  email: string;
}
export const interestRouter = createTRPCRouter({
  getInterest: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const total = await ctx.db.interest.count();
      const data = await ctx.db.interest.findMany({
        skip: (input.page - 1) * 6,
        take: 6,
      });
      return { data, total };
    }),
  addInterest: publicProcedure
    .input(z.object({ token: z.string(), interest: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const secretkey = process.env.SECRET_KEY!;
      const tokenValid = jwt.verify(input.token, secretkey) as DecodedToken;

      if (!tokenValid) {
        return { message: "Error in token" };
      }
      const email = tokenValid?.email;

      const existingUser = await ctx.db.user.findFirst({ where: { email } });

      if (existingUser) {
        const interestIds = input.interest.map(Number);

        return ctx.db.user.update({
          where: { email },
          data: {
            interest: {
              connect: interestIds.map((id) => ({ id })),
            },
          },
          select: { interest: true },
        });
      }
    }),
  removeInterest: publicProcedure
    .input(z.object({ token: z.string(), interest: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const secretkey = process.env.SECRET_KEY!;
      const tokenValid = jwt.verify(input.token, secretkey) as DecodedToken;

      if (!tokenValid) {
        return { message: "Error in token" };
      }

      const email = tokenValid.email;

      const existingUser = await ctx.db.user.findFirst({ where: { email } });

      if (existingUser) {
        const interestIds = input.interest.map(Number);

        return ctx.db.user.update({
          where: { email },
          data: {
            interest: {
              disconnect: interestIds.map((id) => ({ id })),
            },
          },
          select: { interest: true },
        });
      }
    }),
  getUserInterest: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const secretkey = process.env.SECRET_KEY!;
      const tokenValid = jwt.verify(input.token, secretkey) as DecodedToken;

      if (!tokenValid) {
        return { message: "Error in token", interest: [] };
      }
      const email = tokenValid?.email;

      return await ctx.db.user.findFirst({
        where: { email },
        select: { interest: true },
      });
    }),
});
