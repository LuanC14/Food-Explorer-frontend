import { Logo } from "./Logo";
import { FiMenu } from "react-icons/fi";
import { Receipt, SignOut } from "phosphor-react";
import { Input } from "./Input";
import { Button } from "./Button";
import { MagnifyingGlass } from "phosphor-react";
import { AsideMenu } from "./AsideMenu";
import { useState } from "react";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  orders?: number 
}

export function Header(props: HeaderProps) {
  const [asideMenuVisibility, setAsideMenuVisibility] =
    useState<boolean>(false);

  const { user , signOut} = useAuth();
  const navigate = useNavigate()

  function toggleAsideMenuVisibility() {
    setAsideMenuVisibility(!asideMenuVisibility);
  }

  function handleLogout() {
    signOut();
    navigate("/")
    window.location.reload()
  }

  function handleNavigateToNewDishOrOrders() {
    if(user?.isAdmin) {
      navigate("/add")
    } else {
      alert("Funcionalidade ainda não desenvolvida")
    }

  }

  return (
    <>
      <div className={`${asideMenuVisibility ? "block" : "hidden"}`}>
        <AsideMenu toggle={toggleAsideMenuVisibility} isAdmin={user?.isAdmin} />
      </div>

      <div className="flex items-center justify-between lg:gap-6 lg:justify-center px-[61px] bg-dark-700 h-[105px]">
        <button className="lg:hidden" onClick={toggleAsideMenuVisibility}>
          <FiMenu className="text-white-400" size={24} />
        </button>

        <div className="whitespace-nowrap">
          <Logo
            isAdmin={user?.isAdmin}
            font={"text-sm"}
            height={"h-8"}
            width={"w-8"}
          />
        </div>

        <div className="hidden lg:block flex-1">
          <Input
            icon={MagnifyingGlass}
            placeholder="Busque por pratos ou ingredientes"
            type="text"
            id="search"
            px="px-[25%]"
          />
        </div>

        <div className="w-[216px] hidden lg:block ">
          <Button
            title={`${user?.isAdmin ? "Novo prato" : `Pedidos (${props.orders})`}`}
            icon={Receipt}
            isAdmin={user?.isAdmin}
            onClick={handleNavigateToNewDishOrOrders}
          />
        </div>

        <button className="hidden lg:block text-white-100">
          <SignOut size={24} onClick={handleLogout} />
        </button>

        <button className="lg:hidden relative text-white-400">
          <p className="absolute bg-tomato-100 rounded-[99px] w-[20px] h-[20px] text-center z-10 ml-5 flex items-center justify-center text-white-100">
            0
          </p>
          <Receipt size={38} />
        </button>
      </div>
    </>
  );
}
