import { Header } from "../components/Header"
import { Banner } from "../components/Banner"
import { Footer } from "../components/Footer"
import { ItemCard } from "../components/ItemCard"
import { CarouselItems } from "../components/CarouselItems"

export function Home() {

  return (
    <div className="min-h-screen min-w-screen bg-dark-400 overflow-auto">

      <header className="min-w-[375px] fixed z-20 left-0 right-0">
        <Header />
      </header>

      <main className="pb-28 min-w-[415px] mt-[158px] lg:mt-[268px]">
        <section className="pl-[30px] pr-[16px] lg:px-[60px] xl:px-[124px]">
          <Banner />
        </section>

        <div className="flex flex-col gap-12 mt-16 px-4 lg:px-[60px] xl:px-[124px]">
          
          <CarouselItems title="Refeições">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </CarouselItems>

        </div>

      </main>

      <footer className="min-w-[375px] fixed bottom-0 left-0 right-0">
        <Footer />
      </footer>

    </div>
  )
}