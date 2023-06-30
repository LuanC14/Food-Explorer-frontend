import { ReactNode, SelectHTMLAttributes } from "react";

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export function InputSelect(props: InputSelectProps) {
  return (
    <div className="text-white-400 font-Roboto">
      <label className="block text-white-400 mb-1" htmlFor={props.id}>
        {props.label}
      </label>

      <select
        className="w-full h-[48px] px-4 py-4 bg-dark-900 rounded-lg text-gray-500"
        onChange={props.onChange}
        id={props.id}
        value={props.value}
      >
        {props.children}
      </select>
    </div>
  );
}
