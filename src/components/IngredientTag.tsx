import { Plus, X } from "phosphor-react";
import { InputHTMLAttributes } from "react";

interface IngredientTag extends InputHTMLAttributes<HTMLInputElement> {
  isNew: boolean;
  ingredient?: string;
  addIngredient?: () => void
  removeIngredient?: () => void
}

export function IngredientTag( props: IngredientTag) {
  return (
    <div className="text-xxs font-Roboto ">
      {
        props.isNew ? (
          <div className="flex py-2 px-1 h-8 items-center border-2 rounded-lg border-dashed border-gray-500">
          <input
            type="text"
            value={props.value}
            placeholder="Adicionar"
            className="max-w-[80px] bg-transparent first-line:max-w-[100px] outline-none"
            onChange={props.onChange}
          />
          <Plus className="mr-1 cursor-pointer" onClick={props.addIngredient} />
        </div>
        ) :
        <span className="bg-gray-600 rounded-lg py-2 px-3 h-8 flex items-center gap-1" >
          {props.ingredient}
          <X className="cursor-pointer" onClick={props.removeIngredient} />
        </span>
      }

    </div>
  );
}
