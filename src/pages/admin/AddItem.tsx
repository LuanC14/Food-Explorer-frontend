import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Link } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import { Input } from "../../components/Input";
import { InputFile } from "../../components/InputFile";
import { InputSelect } from "../../components/InputSelect";
import { InputIngredients } from "../../components/InputIngredients";
import { IngredientTag } from "../../components/IngredientTag";
import { TextArea } from "../../components/TextArea";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../../components/LoadingModal";

export function AddItem() {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState<File>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [description, setDescription] = useState<string>();
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  function addIngredient() {
    setIngredients((prevState) => [...prevState, ingredient]);
    setIngredient('')
  }

  function removeIngredient(ingredientToRemove: string) {
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient != ingredientToRemove
    );
    setIngredients(filteredIngredients);
  }

  async function createNewItem(event: React.FormEvent) {
    event?.preventDefault();
    setIsLoading(true);
    try {
      if (!name || !price || !category || !description || !image) {
        throw new Error("Há campos incompletos");
      }

      const item = {
        name,
        type: category,
        description,
        value: price,
        ingredients,
      };

      const itemId = (await api.post("/menu", item)).data;

      const fileUploadForm = new FormData();
      fileUploadForm.append("image", image);

      await api
        .patch(`/menu/image/${itemId}`, fileUploadForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          navigate(`/details/${itemId}`);
        });

      setIsLoading(false);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (name && price && category && description && image) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, price, category, description, image, isDisabled]);

  return (
    <>
    <LoadingModal isLoading={isLoading} />
      <div className="min-h-screen min-w-full bg-dark-400 overflow-auto font-Poppins text-white-100">
        <header className="min-w-[385px] fixed z-30 left-0 right-0">
          <Header />
        </header>
        <main className="pb-36 px-8 lg:px-[120px] mt-[141px]">
          <Link
            to="/"
            className="text-white-300 mb-4 flex items-center text-sm lg:text-md font-bold w-[120px]"
          >
            {<CaretLeft />}Voltar
          </Link>

          <h2 className="text-md mb-8">Novo prato</h2>

          <form className="min-w-[200px]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 lg:mb-8">
              <div className="mb-6 lg:mb-0 lg:w-[360px]">
                <InputFile
                  onChange={(event) => setImage(event.target.files?.[0])}
                  nameFile={image?.name}
                />
              </div>

              <div className="mb-6 lg:mb-0 lg:w-[460px]">
                <Input
                  type="text"
                  placeholder="Ex: Salada"
                  label="Nome"
                  id="name"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="mb-6 lg:mb-0 lg:w-[360px]">
                <InputSelect
                  label="Categoria"
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="refeição">Refeição</option>
                  <option value="sobremesa">Sobremesa</option>
                  <option value="drink">Drink</option>
                </InputSelect>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8 mb-6 lg:mb-8">
              <InputIngredients label="Ingredientes">
                {ingredients &&
                  ingredients.map((ingredient, index) => (
                    <IngredientTag
                      isNew={false}
                      key={index}
                      ingredient={ingredient}
                      removeIngredient={() => removeIngredient(ingredient)}
                    />
                  ))}

                <IngredientTag
                  addIngredient={addIngredient}
                  isNew={true}
                  onChange={(event) => setIngredient(event.target.value)}
                  value={ingredient}
                />
              </InputIngredients>

              <div className="lg:min-w-[250px]">
                <Input
                  label="Preço"
                  id="price"
                  placeholder="R$ 00,00"
                  type="number"
                  step="0.01"
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
              </div>
            </div>

            <TextArea
              label="Descrição"
              onChange={(event) => setDescription(event.target.value)}
            />

            <div className="flex justify-end">
              <div className="w-full lg:w-[173px]">
                <Button
                  title="Salvar alterações"
                  isDisabled={isDisabled}
                  onClick={createNewItem}
                />
              </div>
            </div>
          </form>
        </main>

        <footer className="min-w-[385px] fixed bottom-0 left-0 right-0 z-30">
          <Footer />
        </footer>
      </div>
    </>
  );
}
