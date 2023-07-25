import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
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

interface Data {
  ingredients: Ingredients[];
  item: Item;
}

export function EditItem() {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [currentImageName, setCurrentImageName] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [oldIngredients, setOldIngredients] = useState<Ingredients[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();

  function addIngredient() {
    setIngredients((prevState) => [...prevState, newIngredient]);
  }

  async function removeIngredient(ingredientToRemove: string, id?: number) {
    if (id) {
      setIsloading(true);
      const filteredOldIngredients = oldIngredients.filter(
        (ingredient) => ingredient.name != ingredientToRemove
      );
      setOldIngredients(filteredOldIngredients);
      await api.delete(`/ingredient/${id}`).then(() => setIsloading(false));
    } else {
      const filteredIngredients = ingredients.filter(
        (ingredient) => ingredient != ingredientToRemove
      );
      setIngredients(filteredIngredients);
    }
  }

  async function updateItem(event: React.FormEvent) {
    event?.preventDefault();
    setIsloading(true);
    try {
      const item = {
        name,
        type: category,
        description,
        value: price,
      };

      if (ingredients.length > 0) {
        const itemWithIngredients = Object.assign({ ingredients }, item);
        return await api.put(`/menu/${id}`, itemWithIngredients);
      }

      const response = await api.put(`/menu/${id}`, item);

      if (image) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("image", image);
        console.log(response)
        await api.patch(`/menu/image/${id}`, fileUploadForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(() => setIsloading(false))
      }
      const confirm = window.confirm;

      if (confirm("Alteração realizada com sucesso")) {
        navigate(`/details/${id}`);
      }
    } catch (error: unknown) {
      console.error(error);
      setIsloading(false)
    }
  }

  async function deleteItem(event: React.FormEvent) {
    event.preventDefault()
    setIsloading(true)
    await api.delete(`/menu/${id}`).then(() => navigate("/")).then(() => {
      setIsloading(false)
      navigate("/")
    });
  }

  useEffect(() => {
    if (name && price && category && description) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, price, category, description, image, isDisabled]);

  useEffect(() => {
    async function fetchItem() {
      setIsloading(true);
      const item: Data = await (await api.get(`/menu?id=${id}`)).data;

      setOldIngredients(item.ingredients);
      setName(item.item.name);
      setCategory(item.item.type);
      setPrice(item.item.value);
      setDescription(item.item.description);
      setCurrentImageName(item.item.image_url);

      setIsloading(false);
    }

    fetchItem();
  }, [id]);

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
            className="text-white-300 mb-4 flex items-center text-sm lg:text-md font-bold"
          >
            {<CaretLeft />}Voltar
          </Link>

          <h2 className="text-md mb-8">Novo prato</h2>

          <form className="min-w-[200px]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 lg:mb-8">
              <div className="mb-6 lg:mb-0 lg:w-[360px]">
                <InputFile
                  onChange={(event) => setImage(event.target.files?.[0])}
                  nameFile={image ? image.name : currentImageName}
                />
              </div>

              <div className="mb-6 lg:mb-0 lg:w-[460px]">
                <Input
                  type="text"
                  placeholder="Ex: Salada"
                  label="Nome"
                  id="name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
              </div>

              <div className="mb-6 lg:mb-0 lg:w-[360px]">
                <InputSelect
                  label="Categoria"
                  onChange={(event) => setCategory(event.target.value)}
                  value={category}
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
                {oldIngredients &&
                  oldIngredients.map((ingredient, index) => (
                    <IngredientTag
                      isNew={false}
                      key={index}
                      ingredient={ingredient.name}
                      removeIngredient={() =>
                        removeIngredient(ingredient.name, ingredient.id)
                      }
                    />
                  ))}

                {ingredients &&
                  ingredients.map((ingredient, index) => (
                    <IngredientTag
                      isNew={false}
                      ingredient={ingredient}
                      key={index}
                      removeIngredient={() => removeIngredient(ingredient)}
                    />
                  ))}

                <IngredientTag
                  addIngredient={addIngredient}
                  isNew={true}
                  onChange={(event) => setNewIngredient(event.target.value)}
                />
              </InputIngredients>

              <div className="lg:min-w-[250px]">
                <Input
                  label="Preço"
                  id="price"
                  placeholder="R$ 00,00"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
              </div>
            </div>

            <TextArea
              label="Descrição"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />

            <div className="flex justify-end">
              <div className="w-full flex gap-2 lg:w-[340px]">
                <Button
                  title="Excluir prato"
                  isDisabled={isDisabled}
                  onClick={deleteItem}
                  color="bg-dark-800"
                />

                <Button
                  title="Salvar alterações"
                  isDisabled={isDisabled}
                  onClick={updateItem}
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
