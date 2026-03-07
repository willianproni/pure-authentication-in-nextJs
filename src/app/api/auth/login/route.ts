import { env } from "@/config/env";
import { prismaClient } from "@/lib/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});
export async function POST(request: NextRequest) {
  try {
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

    const { email, password } = data;

    const user = await prismaClient.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Credentials.",
        },
        { status: 401 },
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "Invalid Credentials.",
        },
        { status: 401 },
      );
    }

    const accessToken = sign({ sub: user.id }, env.jwtSecret, {
      expiresIn: "1h",
    });

    return NextResponse.json({ accessToken }, { status: 200 });
    //Create access Token
  } catch {}
}
