import { IconProps } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: React.ComponentType<IconProps>;
  isAdmin?: boolean;
  font? : string;
  isDisabled? : boolean
  color?: string
}

export function Button({ title, onClick, icon: Icon, isAdmin, font, isDisabled, color }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${isDisabled ? 'bg-tomato-400 ' : null } ${color ? color : 'bg-tomato-100'} w-full py-3 rounded-md text-white-100 font-Poppins text-xxs font-medium flex items-center justify-center gap-2 ${font}`}
    >
      {Icon && (
        <Icon
          className={`${isAdmin ? "hidden" : ""} text-white-100`}
          size={24}
        />
      )}
      {title}
    </button>
  );
}
