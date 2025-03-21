import { Heart } from "lucide-react";
import useWishlistStore from "@/store/wishlist.store";
import { useState, useEffect } from "react";

interface LikeProps {
  productId: string;
}

const Like: React.FC<LikeProps> = ({ productId }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const [liked, setLiked] = useState(false);

  // Check if the apparel is in the wishlist
  useEffect(() => {
    const isLiked = wishlist.some((item) => item.product_id === productId) ?? false;
    setLiked(isLiked);
  }, [wishlist, productId]);

  const handleLike = async () => {
    if (liked) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    // Optimistically update liked state
    setLiked(!liked);
  };

  return (
    <div onClick={handleLike} className="cursor-pointer h-full w-full">
      <Heart
        className={`stroke-indigo-600 stroke-[1px] h-full w-full ${
          liked ? "fill-indigo-600" : ""
        }`}
      />
    </div>
  );
};

export default Like;
