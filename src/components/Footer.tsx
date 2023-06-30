import grayLogo from "../assets/LogoGray.svg";

export function Footer() {
  return (
    <div className="w-full h-[77px] flex items-center justify-center md:justify-between gap-3 px-7 bg-dark-600 font-Roboto">
      <div className="flex">
        <img src={grayLogo} alt="" />
        <p className="text-xxxs text-gray-700 font-bold ml-[6px] ">
          Food Explorer
        </p>
      </div>

      <p className="text-xxxs whitespace-nowrap text-white-100">
        © 2023 - Todos os direitos reservados.
      </p>
    </div>
  );
}
