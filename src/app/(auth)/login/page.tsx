"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  email: z.email("Formato do e-mail inválido"),
  password: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await axios.post("/api/auth/login", data);

      router.push("/");
    } catch (error) {
      toast.error("Credenciais inválidas!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Entrar com sua conta</CardTitle>
              <CardDescription>
                Insira seu e-mail abaixo para acessar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="email@example.com"
                            autoComplete="email"
                            required
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex items-center">
                            <FieldLabel htmlFor="password">Senha</FieldLabel>
                            <a
                              href="#"
                              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                              Esqueceu sua senha?
                            </a>
                          </div>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="********"
                            type="password"
                            autoComplete="password"
                            required
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Field>
                      <Button disabled={isLoading} type="submit">
                        {isLoading ? "Entrando sua conta..." : "Entrar"}
                      </Button>
                      <Button variant="outline" type="button">
                        Entrar com Google
                      </Button>
                      <FieldDescription className="text-center">
                        Não possui conta? <a href="signup">Criar conta</a>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
