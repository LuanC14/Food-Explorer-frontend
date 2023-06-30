import {  Pencil, Minus, Plus } from "phosphor-react";
import { Button } from "./Button";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
interface ItemCardProps {
  id?: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  amount?: number;
  incrementAmount?: () => void;
  setOrder: (value: number) => void;
}

export function ItemCard(props: ItemCardProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  function incrementAmount() {
    setAmount(amount + 1);
  }

  function handleLike() {
    isLiked ? setIsLiked(false) : setIsLiked(true);
  }

  function decrementAmount() {
    if (amount == 0) {
      return;
    }
    setAmount(amount - 1);
  }

  const navigate = useNavigate();

  return (
    <div className="relative min-w-[210px] min-h-[292px] text-white-300 bg-dark-200 border border-dark-100 lg:w-[304px] lg:min-h-[462px] font-Poppins">
      <div className="absolute right-0 mr-3 mt-3 cursor-pointer">
        {user && user.isAdmin ? (
          <Pencil onClick={() => navigate(`/edit/${props.id}`)} size={25} />
        ) : (
          <div onClick={handleLike}>
            <FiHeart
              className={`${
                isLiked
                  ? "fill-tomato-200 stroke-tomato-200"
                  : " fill-transparent"
              }`}
              size={25}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center px-6 py-6">
        <img
          className="rounded-full w-[88px] h-[88px] border border-gray-700 lg:w-[176px] lg:h-[176px] cursor-pointer"
          onClick={() => navigate(`/details/${props.id}`)}
          src={`${api.defaults.baseURL}/files/${props.image}`}
          alt=""
        />

        <div className="flex flex-col gap-3 mt-3 text-center">
          <p
            className="text-xxs lg:text-md lg:font-bold whitespace-nowrap cursor-pointer"
            onClick={() => navigate(`/details/${props.id}`)}
          >
            {props.name} &gt;
          </p>

          <p className="text-xxs">{props.description}</p>

          <p className="text-cake-100 text-xs mb-3 lg:text-lg">
            R${" "}
            {amount === 0
              ? props.price.toFixed(2)
              : (props.price * amount).toFixed(2)}
          </p>
        </div>

        {user && !user.isAdmin ? (
          <div
            className={` w-full flex flex-col items-center lg:flex lg:flex-row lg:gap-10`}
          >
            <div className="flex gap-3 mb-5 lg:text-sm lg:mb-0 items-center">
              <Minus onClick={decrementAmount} size={24} />
              <p>{amount}</p>
              <Plus onClick={incrementAmount} size={24} />
            </div>

            <Button title="incluir" onClick={() => props.setOrder(amount)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
