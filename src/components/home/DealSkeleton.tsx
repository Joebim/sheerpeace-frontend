export default function DealSkeleton() {
  return (
    <div className="flex flex-row min-h-[220px] w-full animate-pulse">
      <div className="flex-1 rounded-[10px] overflow-hidden bg-gray-300"></div>

      <div className="flex-1 p-[26px] flex flex-col justify-between">
        <div className="flex flex-col gap-[20px]">
          <div className="h-[14px] bg-gray-300 rounded-full"></div>
          <div className="flex flex-row gap-[10px] items-center">
            <div className="h-[12px] bg-gray-300 rounded-full w-1/2"></div>
            <div className="h-[12px] bg-gray-300 rounded-full w-1/4"></div>
          </div>

          <div className="h-[11px] bg-gray-300 rounded-full"></div>
          <div className="flex flex-row gap-[10px] items-center">
            <div className="h-[12px] bg-gray-300 rounded-full w-1/2"></div>
            <div className="h-[12px] bg-gray-300 rounded-full w-1/4"></div>
          </div>
        </div>

     
      </div>
    </div>
  );
}
