import { prismaClient } from "@/lib/prismaClient";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().nonempty(),
    confirm_password: z.string().min(8),
  })
  .refine(({ password, confirm_password }) => password === confirm_password);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { success, data, error } = schema.safeParse(body);

  if (!success) {
    return NextResponse.json(
      {
        error: error.issues,
      },
      { status: 400 },
    );
  }

  const { email, firstName, lastName, password } = data;

  const emailAlteadyInUse = await prismaClient.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (emailAlteadyInUse) {
    return NextResponse.json(
      {
        error: "Email already in use",
      },
      { status: 409 },
    );
  }

  const hashedPassword = await hash(password, 12);

  await prismaClient.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
    },
  });

  return NextResponse.json(null, { status: 201 });
}
