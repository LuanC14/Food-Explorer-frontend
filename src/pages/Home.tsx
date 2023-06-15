import { Header } from "../components/Header"
import { Banner } from "../components/Banner"
import { Footer } from "../components/Footer"
export function Home() {

  return (
    <div className="min-h-screen min-w-screen bg-dark-400 overflow-auto">

      <header className="min-w-[375px] fixed z-20 left-0 right-0">
        <Header />
      </header>

      <main className="min-w-[415px] mt-[158px] lg:mt-[268px]">
        <section className="pl-[30px] pr-[16px] lg:px-[124px]">
          <Banner />
        </section>
      </main>

      <footer className="min-w-[375px] fixed bottom-0 left-0 right-0">
        <Footer />
      </footer>

    </div>
  )
}