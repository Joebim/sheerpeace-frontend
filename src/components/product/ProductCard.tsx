import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import { Product } from "@/types";
import { usePrice } from "@/utils/usePrice";
import { shortenText } from "@/utils/useShortenText";
import Image from "next/image";
import Like from "./Like";
import Link from "next/link";
import Rating from "../home/Rating";
import AddToCart from "./AddToCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice } = usePrice();
  return (
    <div className="relative rounded-[10px] overflow-hidden hover:shadow-md duration-300 self-start">
      <div className="z-[2] scale-75 absolute flex top-[5px] right-[5px] justify-center items-center h-[30px] sm:h-[40px] w-[30px] sm:w-[40px] rounded-full shadow-sm bg-white p-[4px] sm:p-[8px]">
        <Like productId={product.id} />
      </div>
      {product.is_discounted && (
        <div className="">
          <div className="bg-sheerpeace-black absolute top-[15px] left-[10px] bg-primary-100 text-[7px] sm:text-[9px] text-white px-[4px] sm:px-[6px] py-[2px] sm:py-[4px] rounded-[5px]">
            {product.discount_percentage}% OFF
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <Link href={`/products/${product.id}`} passHref>
          <div className="w-full h-[100px] sm:h-[200px]">
            <Image
              height={300}
              width={300}
              alt={product.name}
              src={renderImageUrl(product.images[0])}
              className="object-cover h-full w-full"
              priority
            ></Image>
          </div>
        </Link>

        <div className="flex flex-col gap-[8px] p-[10px]">
          <Link
            href={`/products/${product.id}`}
            className="flex flex-col gap-[8px]"
            passHref
          >
            <h3 className="text-[10px] sm:text-[12px] font-bold">
              {shortenText(product?.name, 21)}
            </h3>
            <div className="">
              <Rating rating={product.average_rating} />
            </div>
          </Link>

          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-[15px] font-bold">
              {formatPrice(product?.price)}
            </p>

            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
