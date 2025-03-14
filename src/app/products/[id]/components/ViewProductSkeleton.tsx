import React from 'react';

const ViewProductSkeleton: React.FC = () => {
    return (
        <div className="flex flex-[6] flex-col sm:flex-row gap-[20px] animate-pulse">
            <div className="flex-[3] flex flex-col gap-[20px]">
                <div className="relative w-full max-w-[560px] h-[400px] bg-gray-300 rounded"></div>

                <div className="flex flex-row gap-[10px]">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="relative h-[72px] w-[72px] bg-gray-300 rounded-[8px]"
                        ></div>
                    ))}
                    <div className="h-[72px] w-[72px] bg-gray-300 rounded-[8px]"></div>
                </div>
            </div>

            <div className="flex-[3] flex flex-col gap-[20px] pt-[40px]">
                <div className="h-[30px] bg-gray-300 rounded"></div>
                <div className="h-[20px] bg-gray-300 rounded"></div>

                <div className="flex flex-row gap-[20px]">
                    <div className="h-[20px] w-[100px] bg-gray-300 rounded"></div>
                    <div className="flex flex-row items-center gap-[10px]">
                        <div className="h-[20px] w-[100px] bg-gray-300 rounded"></div>
                        <div className="h-[20px] w-[100px] bg-gray-300 rounded"></div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="h-[25px] w-[100px] bg-gray-300 rounded"></div>
                    <div className="h-[15px] w-[50px] bg-gray-300 rounded"></div>
                    <div className="h-[25px] w-[50px] bg-gray-300 rounded"></div>
                </div>

                <div className="h-[1px] bg-gray-300 rounded"></div>

                <div className="flex flex-row gap-[30px]">
                    <div>
                        <div className="h-[11px] w-[100px] bg-gray-300 rounded"></div>
                        <div className="flex space-x-1 mt-2">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="w-6 h-6 bg-gray-300 rounded-full"
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="h-[11px] w-[100px] bg-gray-300 rounded"></div>
                        <div className="flex space-x-1 mt-2">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="w-8 h-8 bg-gray-300 rounded-[3px]"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductSkeleton;
