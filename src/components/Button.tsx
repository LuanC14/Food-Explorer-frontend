interface ButtonProps {
  title: string
}

export function Button({title}: ButtonProps) {

  return(
    <button className="bg-tomato-100 w-full py-3 rounded-md text-white-100 font-Poppins text-xxs font-medium">{title}</button>
  )
}