import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Receipt, Minus, Plus, CaretLeft } from "phosphor-react";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { LoadingModal } from "../components/LoadingModal";

interface Data {
  ingredients: Ingredients[];
  item: Item;
}

export function DetailsItem() {
  const [item, setItem] = useState<Item>();
  const [ingredients, setIngredients] = useState<Ingredients[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { id } = useParams();

  const imageUrl = `${api.defaults.baseURL}/files/${item?.image_url}`;
  const navigate = useNavigate();

  let iconButton;
  user?.isAdmin ? (iconButton = undefined) : (iconButton = Receipt);

  let titleButton: string;
  user?.isAdmin
    ? (titleButton = "Editar prato")
    : (titleButton = "pedir ∙ R$ 25,00");

  function handleClickButton() {
    if (titleButton === "Editar prato") {
      navigate(`/edit/${id}`);
    } else {
      null;
    }
  }

  useEffect(() => {
    async function fetchItem() {
      setIsLoading(true)
      const itemData: Data = (await api.get(`/menu?id=${id}`)).data;
      setItem(itemData.item);
      setIngredients(itemData.ingredients);
      setIsLoading(false)
    }

    fetchItem();
  }, [id]);

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <div className="bg-dark-400 w-screen h-screen overflow-auto font-Poppins text-white-100">
        <header className="min-w-[385px] fixed z-30 left-0 right-0">
          <Header />
        </header>

        <main className="mt-[141px] px-14 pb-28">
          <Link
            to="/"
            className="text-white-300 mb-4 flex items-center text-sm lg:text-md font-bold"
          >
            {<CaretLeft />}Voltar
          </Link>

          <div className="text-center flex flex-col items-center lg:flex-row lg:gap-12 lg:text-start">
            <img
              className="border-gray-700 rounded-full min-w-[264px] min-h-[264px] w-[264px] h-[264px] border  lg:min-w-[390px] lg:min-h-[390px] lg:w-[390px] lg:h-[390px]"
              src={imageUrl}
              alt=""
            />

            <section>
              <div className="mt-3 mb-6">
                <p className="mb-6 font-medium text-md lg:text-xl">
                  {item?.name}
                </p>

                <p className="text-xxs lg:text-md">{item?.description}</p>
              </div>

              <div className="flex flex-wrap gap-6 mb-12 text-xxs">
                {ingredients?.map((ingredient) => (
                  <span
                    key={ingredient.id}
                    className="bg-dark-1000 rounded py-1 px-2"
                  >
                    {ingredient.name}
                  </span>
                ))}
              </div>

              <div className="w-full flex gap-4 items-center justify-center lg:max-w-[300px]">
                {user && user.isAdmin ? null : (
                  <div className="flex gap-3 lg:text-sm items-center">
                    <Minus size={24} />
                    <p className="font-bold text-sm">01</p>
                    <Plus size={24} />
                  </div>
                )}

                <Button
                  icon={iconButton}
                  title={titleButton}
                  font="text-xxxs"
                  onClick={handleClickButton}
                />
              </div>
            </section>
          </div>
        </main>

        <footer className="min-w-[385px] fixed bottom-0 left-0 right-0 z-30">
          <Footer />
        </footer>
      </div>
    </>
  );
}
