import { InputHTMLAttributes } from "react";
import { IconProps } from "phosphor-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  margin?: string;
  px?: string;
  icon?: React.ComponentType<IconProps>;
}

export function Input({
  id,
  type,
  label,
  placeholder,
  margin,
  onChange,
  px,
  icon: Icon,
  step,
  value
}: InputProps) {
  return (
    <div className={`gap-2 w-full font-Roboto ${margin}`}>
      <label className="block text-white-400 mb-1" htmlFor={id}>
        {label}
      </label>

      <div className={`flex bg-dark-900 rounded-lg items-center ${px}`}>
        {Icon && <Icon className="text-white-100" size={24} />}

        <input
          className="h-12 bg-transparent py-4 px-3 outline-none shadow-none text-gray-500 placeholder:text-gray-500 w-full"
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          onChange={onChange}
          step={step}
          value={value}
        />
      </div>
    </div>
  );
}
