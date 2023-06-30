import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea(props: TextAreaProps) {
  return (
    <div className="text-white-400 font-Roboto">
      <label className="block mb-1"  htmlFor={props.id}>
        {props.label}
      </label>

      <textarea
        className="w-full px-3 py-3 rounded-lg h-[172px] bg-dark-800 resize-none"
        placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
        onChange={props.onChange}
        value={props.value}
        name=""
        id={props.id}
      ></textarea>
    </div>
  );
}
