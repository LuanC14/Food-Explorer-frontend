import { InputHTMLAttributes } from "react";
import { UploadSimple } from "phosphor-react";

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  nameFile?: string;
}

export function InputFile( props: InputFileProps) {
  return (
    <div>
      <label className="block mb-1 text-white-400" htmlFor="uploadImage">
        Imagem do prato
      </label>

      <div className="flex bg-dark-900 rounded-lg pl-3">
        <label
          className="flex gap-2 text-white-400 h-[48px] text-xxs items-center cursor-pointer"
          htmlFor="uploadImage"
        >
          {<UploadSimple size={20} />}{" "}
          {props.nameFile ? props.nameFile : "Selecione imagem"}
        </label>

        <input
          className="hidden"
          type="file"
          id="uploadImage"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
