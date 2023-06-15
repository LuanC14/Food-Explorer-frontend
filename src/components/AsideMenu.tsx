import { X } from "phosphor-react"
import { Input } from "./Input"
import { MagnifyingGlass } from 'phosphor-react'

interface AsideMenuProps {
  toggle: () => void
  isAdmin?: boolean
}

export function AsideMenu({ toggle, isAdmin }: AsideMenuProps) {

  return (
    <div className="absolute inset-0 z-30 h-screen">
      <header className="bg-dark-700 w-full h-[114px] flex items-center px-7">
        <button onClick={toggle} className="flex items-center gap-4 text-white-100 font-Roboto text-sm"><X />Menu</button>
      </header>

      <main className="bg-dark-400 h-full px-7 pt-9">
        <Input
          placeholder="Busque por pratos ou ingredientes"
          type="text" icon={MagnifyingGlass}
          px="px-[14px]"
        />

        <ul className="text-white-300 font-Poppins text-md mt-9 flex flex-col gap-2">
          <li className={`${isAdmin ? '' : 'hidden'} border-b border-dark-1000 pb-2`}>Novo prato</li>
          <li className="border-b border-dark-1000 pb-2">Sair</li>
        </ul>
      </main>
    </div>
  )
}