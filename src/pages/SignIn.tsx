import { Logo } from "../components/Logo"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Link } from "react-router-dom"

export function SignIn() {

  return (
    <div className="min-w-screen min-h-screen overflow-auto px-1 bg-dark-400 flex flex-col justify-center items-center font-Poppins">

      <div className="w-[316px] lg:w-[900px] xl:w-[1100px] h-[430px] lg:h-[540px] lg:flex lg:justify-between lg:items-center">
        <Logo />

        <div>
          <form className="mt-[73px] lg:mt-0 lg:bg-dark-700 lg:px-16 lg:py-16 lg:rounded-2xl xl:w-[476px] lg:w-[426px]">

            <h2 className="hidden lg:block text-center mb-8 text-lg text-white-100 font-medium">Faça login</h2>

            <Input type="email" id="email" label="Email" placeholder="Exemplo: exemplo@exemplo.com.br" />
            <Input type="password" id="password" label="Senha" placeholder="No mínimo 6 caracteres" classname="mt-8 mb-8" />
            <Button title="Entrar" />
          </form>

          <Link to="/signup" className="text-white-100 block mt-8 text-center font-medium text-xxs ">Criar uma conta</Link>
        </div>
      </div>
    </div>
  )
}

