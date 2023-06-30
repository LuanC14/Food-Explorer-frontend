import { useEffect, useState } from "react";
import { MouseEvent } from "react";

import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { LoadingModal } from "../components/LoadingModal";

export function SignUp() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const navigate = useNavigate();

  async function handleCreate(
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("Preencha todos os campos do formulário");
      return;
    }

    if (password.length < 6) {
      alert("Sua senha precisa ter no mínimo 6 caracteres");
      return;
    }

    try {
      setIsloading(true);

      await api
        .post("/user", { name, email, password })
        .then(() => setIsloading(false));

      navigate("/");
    } catch (error: unknown) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!name || !email || !password || password.length < 6) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, email, password]);

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <div className="min-w-screen min-h-screen overflow-auto px-1 bg-dark-400 flex flex-col justify-center items-center font-Poppins font-medium">
        <div className="w-[316px] lg:w-[900px] xl:w-[1100px] lg:flex lg:justify-between lg:items-center">
          <Logo />

          <div>
            <form className="mt-[73px] lg:mt-0 lg:bg-dark-700 lg:px-16 lg:py-12 lg:rounded-2xl xl:w-[476px] lg:w-[426px]">
              <h2 className="hidden lg:block text-center mb-8 text-lg text-white-100 ">
                Crie sua conta
              </h2>
              <Input
                type="text"
                id="name"
                label="Nome"
                placeholder="Exemplo: Maria da Silva"
                onChange={(event) => setName(event.target.value)}
              />

              <Input
                type="email"
                id="email"
                label="Email"
                placeholder="Exemplo: exemplo@exemplo.com.br"
                margin="mt-6 mb-6"
                onChange={(event) => setEmail(event.target.value)}
              />

              <Input
                type="password"
                id="password"
                label="Senha"
                placeholder="No mínimo 6 caracteres"
                margin="mb-6"
                onChange={(event) => setPassword(event.target.value)}
              />

              <Button
                title="Criar conta"
                onClick={handleCreate}
                isDisabled={isDisabled}
              />
            </form>

            <Link
              to="/"
              className="text-white-100 block mt-8 text-center text-xxs"
            >
              Já tenho uma conta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
