import { useCartStore } from "@/store/cart.store";
import { CartItem } from "@/types";
import { Minus, Plus } from "lucide-react";

import { NextPage } from "next";

interface Props {
  cartItem: CartItem;
}

const QuantityUpdater: NextPage<Props> = ({ cartItem }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="flex flex-row items-center gap-[10px]">
      <div
        className="text-[20px] cursor-pointer bg-primary-100 px-2 rounded-sm"
        onClick={() =>
          updateQuantity(cartItem.product_id, cartItem.quantity - 1)
        }
      >
        <Minus className="w-[12px] text-light" />
      </div>
      <input
        type="text"
        value={cartItem.quantity}
        className="border-[1px] outline-none w-[30px] text-center text-[10px]"
        onChange={(e) =>
          updateQuantity(cartItem.product_id, Number(e.target.value))
        }
      />
      <div
        className="text-[20px] cursor-pointer bg-primary-100 px-2 rounded-sm"
        onClick={() =>
          updateQuantity(cartItem.product_id, cartItem.quantity + 1)
        }
      >
        <Plus className="w-[12px] text-light" />
      </div>
    </div>
  );
};

export default QuantityUpdater;
