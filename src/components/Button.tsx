import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  title: string
}

export function Button({title, onClick}: ButtonProps) {

  return(
    <button onClick={onClick} className="bg-tomato-100 w-full py-3 rounded-md text-white-100 font-Poppins text-xxs font-medium">{title}</button>
  )
}