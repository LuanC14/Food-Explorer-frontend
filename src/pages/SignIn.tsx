import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useState, MouseEvent, useEffect } from "react";
import { LoadingModal } from "../components/LoadingModal";

export function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const { signIn } = useAuth();

  async function handleSignIn(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsLoading(true);
    await signIn({ email, password }).then(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if(!email || !password || password.length < 6) { 
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [email,password])

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      
      <div className="min-w-screen min-h-screen overflow-auto px-1 bg-dark-400 flex flex-col justify-center items-center font-Poppins">
        <div className="w-[316px] lg:w-[900px] xl:w-[1100px] h-[430px] lg:h-[540px] lg:flex lg:justify-between lg:items-center">
          <Logo />

          <div>
            <form className="mt-[73px] lg:mt-0 lg:bg-dark-700 lg:px-16 lg:py-16 lg:rounded-2xl xl:w-[476px] lg:w-[426px]">
              <h2 className="hidden lg:block text-center mb-8 text-lg text-white-100 font-medium">
                Faça login
              </h2>

              <Input
                type="email"
                id="email"
                label="Email"
                placeholder="Exemplo: exemplo@exemplo.com.br"
                onChange={(event) => setEmail(event.target.value)}
              />

              <Input
                type="password"
                id="password"
                label="Senha"
                placeholder="No mínimo 6 caracteres"
                margin="mt-8 mb-8"
                onChange={(event) => setPassword(event.target.value)}
              />

              <Button title="Entrar" onClick={handleSignIn} isDisabled={isDisabled} />
            </form>

            <Link
              to="/signup"
              className="text-white-100 block mt-8 text-center font-medium text-xxs "
            >
              Criar uma conta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
