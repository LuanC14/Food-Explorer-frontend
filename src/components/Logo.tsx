import logo from '../assets/Logo.svg'

interface LogoProps {
  font?: string
  width?: string
  height?: string
  isAdmin?: boolean
}

export function Logo({ font, width, height, isAdmin }: LogoProps) {

  if (!font && !width && !height) {
    font = 'text-xxl'
    width = 'w-11'
    height = 'h-11'
  }

  return (
    <div className='flex gap-2 items-center font-Roboto font-bold text-lg'>
      <img className={`${width} ${height}`} src={logo} alt="" />

      <div className={`flex gap-2 lg:flex-col lg:gap-0 lg:text-end`}>
        <p className={`text-white-100 ${font}`} >Food Explorer</p>
        <p className={`${!isAdmin ? 'hidden' : ''} text-xxxs text-cake-100 font-normal lg:mt-[-6px]`}>admin</p>
      </div>

    </div>
  )
}