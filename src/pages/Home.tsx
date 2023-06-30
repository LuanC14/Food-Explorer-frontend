import { Header } from "../components/Header";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { ItemCard } from "../components/ItemCard";
import { CarouselItems } from "../components/CarouselItems";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { LoadingModal } from "../components/LoadingModal";

export function Home() {
  const [meals, setMeals] = useState<Item[]>();
  const [desserts, setDesserts] = useState<Item[]>();
  const [drinks, setDrinks] = useState<Item[]>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [ orders, setOrders] = useState<number>(0)

  function setOrder(value: number) {
    setOrders(prevState => value + prevState)
  }

  useEffect(() => {
    async function fetchItems() {
      setIsloading(true);
      const allItems: Item[] = (await api.get("/menu")).data;

      const meals = allItems.filter((item) => item.type === "refeição");
      const desserts = allItems.filter((item) => item.type === "sobremesa");
      const drinks = allItems.filter((item) => item.type === "drink");

      setMeals(meals);
      setDesserts(desserts);
      setDrinks(drinks);

      setIsloading(false);
    }

    fetchItems();
  }, []);

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <div className="min-h-screen bg-dark-400 overflow-auto scrollbar-none">
        <header className="min-w-[385px] fixed z-30 left-0 right-0">
          <Header orders={orders} />
        </header>

        <main className="pb-28 min-w-[415px] mt-[158px] lg:mt-[268px]">
          <section className="pl-[30px] pr-[16px] lg:px-[60px] xl:px-[124px]">
            <Banner />
          </section>

          <section className="flex flex-col gap-12 mt-16 px-4 lg:px-[60px] xl:px-[124px]">
            <CarouselItems title="Refeições">
              {meals &&
                meals.map((meal) => (
                  <ItemCard
                    name={meal.name}
                    image={meal.image_url}
                    description={meal.description}
                    price={meal.value}
                    id={meal.id}
                    key={meal.id}
                    setOrder={setOrder}
                  />
                ))}
            </CarouselItems>

            <CarouselItems title="Sobremesas">
              {desserts &&
                desserts.map((dessert) => (
                  <ItemCard
                    name={dessert.name}
                    image={dessert.image_url}
                    description={dessert.description}
                    price={dessert.value}
                    id={dessert.id}
                    key={dessert.id}
                    setOrder={setOrder}
                  />
                ))}
            </CarouselItems>

            <CarouselItems title="Drinks">
              {drinks &&
                drinks.map((drink) => (
                  <ItemCard
                    name={drink.name}
                    image={drink.image_url}
                    description={drink.description}
                    price={drink.value}
                    id={drink.id}
                    key={drink.id}
                    setOrder={setOrder}
                  />
                ))}
            </CarouselItems>
          </section>
        </main>

        <footer className="min-w-[385px] fixed bottom-0 left-0 right-0 z-30">
          <Footer />
        </footer>
      </div>
    </>
  );
}
