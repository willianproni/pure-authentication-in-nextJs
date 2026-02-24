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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Criar uma nova conta</CardTitle>
            <CardDescription>
              Entre com suas informações para criar uma nova conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome Sobrenome..."
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                  />
                  <FieldDescription>
                    Usaremos este endereço de e-mail para entrar em contato com
                    você. Não compartilharemos seu e-mail com mais ninguém.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input id="password" type="password" required />
                  <FieldDescription>
                    Deve ter no mínimo 8 caracteres.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirmar senha
                  </FieldLabel>
                  <Input id="confirm-password" type="password" required />
                  <FieldDescription>
                    Por favor, confirme sua senha.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit">Criar Conta</Button>
                    <Button variant="outline" type="button">
                      Entrar com Google
                    </Button>
                    <FieldDescription className="px-6 text-center">
                      Já tem uma conta? <a href="#">Entrar</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
