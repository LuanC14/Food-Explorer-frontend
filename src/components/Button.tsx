import { IconProps } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  icon?: React.ComponentType<IconProps>;
  isAdmin? : boolean
}

export function Button({ title, onClick, icon: Icon,isAdmin }: ButtonProps) {

  return (

    <button
      onClick={onClick}
      className="bg-tomato-100 w-full py-3 rounded-md text-white-100 font-Poppins text-xxs font-medium flex items-center justify-center gap-2 ">
      {Icon && <Icon className={`${isAdmin ? 'hidden' : ''} text-white-100`} size={24} />}{title}
    </button>
  )
}