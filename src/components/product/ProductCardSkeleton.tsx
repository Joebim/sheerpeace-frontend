
const ProductCardSkeleton: React.FC = () => {

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="w-full h-[250px] animate-pulse rounded-[10px] bg-gray-200">


      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="h-[20px] w-full rounded-full bg-gray-200 animate-pulse">
         
        </div>
        <div className="h-[20px] w-[70%] rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
