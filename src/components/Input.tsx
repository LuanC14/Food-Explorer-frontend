import { ChangeEvent } from "react"

import { IconProps } from "phosphor-react"
interface InputProps {
  type: string
  id?: string
  label?: string
  placeholder: string
  margin?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  px?: string
  icon?: React.ComponentType<IconProps>;
}

export function Input({ id, type, label, placeholder, margin, onChange, px, icon: Icon }: InputProps) {

  return (
    <div className={`gap-2 autofill:bg-yellow-200 rounded-lg font-Roboto h-12 ${margin}`}>

      <label className="block text-white-400" htmlFor={id}>{label}</label>

      <div className={`flex bg-dark-900 items-center ${px}`}>

        {Icon && <Icon className="text-white-100" size={24} />}

        <input
          className="h-12 bg-transparent py-4 px-3 outline-none shadow-none text-gray-500 placeholder:text-gray-500 w-full"
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          onChange={onChange}
        />
      </div>
    </div>

  )
}