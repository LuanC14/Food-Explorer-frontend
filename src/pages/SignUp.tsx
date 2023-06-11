import { Logo } from "../components/Logo"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Link } from "react-router-dom"

export function SignUp() {

  return (
    <div className="min-w-screen min-h-screen overflow-auto px-1 bg-dark-400 flex flex-col justify-center items-center font-Poppins font-medium">

      <div className="w-[316px] lg:w-[900px] xl:w-[1100px] lg:flex lg:justify-between lg:items-center">
        <Logo />

        <div>
          <form className="mt-[73px] lg:mt-0 lg:bg-dark-700 lg:px-16 lg:py-12 lg:rounded-2xl xl:w-[476px] lg:w-[426px]">

            <h2 className="hidden lg:block text-center mb-8 text-lg text-white-100 ">Crie sua conta</h2>
            <Input type="text" id="name" label="Nome" placeholder="Exemplo: Maria da Silva" />
            <Input type="email" id="email" label="Email" placeholder="Exemplo: exemplo@exemplo.com.br" classname="mt-6 mb-6" />
            <Input type="password" id="password" label="Senha" placeholder="No mínimo 6 caracteres" classname="mb-6" />
            <Button title="Criar conta" />
          </form>

          <Link to="/signin" className="text-white-100 block mt-8 text-center text-xxs">Já tenho uma conta</Link>
        </div>
      </div>
    </div>
  )
}

