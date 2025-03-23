import { CircleCheck, CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart.store";
import { Product } from "@/types";

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const { cart, addItem, removeItem } = useCartStore();
  const [isInCart, setIsInCart] = useState(false);

  // Check if the product is in the cart
  useEffect(() => {
    setIsInCart(
      cart?.items.some((item) => item.product_id === product.id) ?? false
    );
  }, [cart, product.id]);

  const handleAddToCart = () => {
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem({
        product_id: product.id,
        product: product,
        quantity: 1,
        selected_sizes: product?.sizes,
        selected_variants: product?.variants,
        selected_colors: product?.colors,
      });
    }
    setIsInCart(!isInCart);
  };

  return (
    <div onClick={handleAddToCart} className="cursor-pointer">
      {isInCart ? (
        <CircleCheck className="text-white fill-sheerpeace-purple-secondary" />
      ) : (
        <CirclePlus className="text-sheerpeace-black" />
      )}
    </div>
  );
};

export default AddToCart;
