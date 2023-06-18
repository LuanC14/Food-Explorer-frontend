import banner from '../assets/banner.png'
import bannerMobile from '../assets/bannerMobile.png'

export function Banner() {

  return (
    <div className="w-full flex items-center font-Poppins relative bg-gradient-to-r from-gradient-200 to-gradient-100 h-[120px] md:h-[260px]" >

      <div>
        <img
          className='hidden md:block absolute md:h-[286px] md:w-[300px] md:ml-[-25px] md:mt-[-156px] lg:w-[400px] lg:mt-[-282px] lg:h-[412px] lg:ml-[-32px] xl:w-[600px] xl:ml-[-50px]'
          src={banner}
        />

        <img
          className='md:hidden absolute w-[170px] h-[150px] mt-[-90px] ml-[-30px]'
          src={bannerMobile}
        />
      </div>

      <div className='text-white-100 absolute right-12 md:right-3 lg:right-24 xl:right-32 w-[200px] md:w-[422px]'>
        <h1 className='text-xs font-semibold flex-nowrap whitespace-nowrap lg:text-xl'>Sabores inigualáveis</h1>
        <p className='text-xxxs lg:xs'>Sinta o cuidado do preparo com ingredientes selecionados.</p>
      </div>

    </div>
  )
}