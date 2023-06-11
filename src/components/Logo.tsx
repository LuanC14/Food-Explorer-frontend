import logo from '../assets/Logo.svg'

export function Logo() {

  return(
    <div className='flex gap-2 items-center font-Roboto font-bold text-lg'>
      <img className='w-[44px] h-[44px]' src={logo} alt="" />
      <p className='text-white-100'>Food Explorer</p>
    </div>
  )
}