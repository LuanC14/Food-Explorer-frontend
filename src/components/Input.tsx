import { InputHTMLAttributes } from "react";
import { IconProps } from "phosphor-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  margin?: string;
  px?: string;
  icon?: React.ComponentType<IconProps>;
}

export function Input(props: InputProps) {
  const { icon: Icon } = props;

  return (
    <div className={`gap-2 w-full font-Roboto ${props.margin}`}>
      <label className="block text-white-400 mb-1" htmlFor={props.id}>
        {props.label}
      </label>

      <div className={`flex bg-dark-900 rounded-lg items-center ${props.px}`}>
        {Icon && <Icon className="text-white-100" size={24} />}

        <input
          className="h-12 bg-transparent py-4 px-3 outline-none shadow-none text-gray-500 placeholder:text-gray-500 w-full"
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          autoComplete="off"
          onChange={props.onChange}
          step={props.step}
          value={props.value}
        />
      </div>
    </div>
  );
}
