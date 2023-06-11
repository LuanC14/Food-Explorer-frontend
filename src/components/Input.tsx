interface InputProps {
  type: string
  id?: string
  label?: string
  placeholder: string
  classname? : string
}


export function Input({ id, type, label, placeholder, classname }: InputProps) {

  return (
    <div className={`flex flex-col gap-2 autofill:bg-yellow-200 font-Roboto ${classname}`}>
      <label className="text-white-400" htmlFor={id}>{label}</label>
      <input 
      className="bg-dark-900 py-4 px-3 rounded-lg text-gray-500 placeholder:text-gray-500" 
      id={id} 
      type={type} 
      placeholder={placeholder}
      autoComplete="off"
      />
    </div>

  )
}