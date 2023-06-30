import { InputHTMLAttributes, ReactNode } from "react";

interface InputIngredientsProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children?: ReactNode;
}

export function InputIngredients(props: InputIngredientsProps) {
  return (
    <div className="w-full overflow-auto">
      <label className="block text-white-400 mb-1" htmlFor={props.id}>
        {props.label}
      </label>

      <div className="flex overflow-x-scroll scrollbar-none items-center gap-2 bg-dark-900 rounded-lg h-12 px-2 py-2">{props.children}</div>
    </div>
  );
}
