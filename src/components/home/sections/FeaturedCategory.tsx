import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCategory() {
  const collections = [
    {
      name: "T-Shirt",
      image: "https://i.imgur.com/iLzzJ9o.jpeg",
      link: "/collections/tshirts",
    },
    {
      name: "Bottoms",
      image: "https://i.imgur.com/9QkV3Nc.jpeg",
      link: "/collections/bottoms",
    },
    {
      name: "Outerwear",
      image: "https://i.imgur.com/coO4TQY.jpeg",
      link: "/collections/outerwear",
    },
    {
      name: "Nurse Wear",
      image: "https://i.imgur.com/zdC378l.jpeg",
      link: "/collections/loungewear",
    },
  ];

  return (
    <div className="p-4 sm:px-24">
      <div className="grid grid-rows-2 grid-flow-col gap-6 h-[600px]">
        {collections.map((category, index) => (
          <Link
            key={index}
            href={category.link}
            className={`relative flex items-end justify-start p-9 overflow-hidden rounded-[20px] bg-white transition-transform hover:scale-[1.02] hover:shadow-lg border ${
              index === 0
                ? "row-span-1"
                : index === 1
                ? "col-start-2 row-span-1"
                : index === 2
                ? "row-start-2 col-span-2"
                : "col-start-3 row-span-2"
            }`}
          >
            <Image
              height={200}
              width={200}
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="flex flex-row gap-[10px] relative z-10 text-black bg-white text-lg font-bold px-4 py-2 rounded-full">
              <p className="">{category.name}</p>
              <ArrowUpRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
