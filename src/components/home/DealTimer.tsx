import { useEffect, useState } from "react";

interface CounterProps {
  timerPrompt: string;
  discountEndDate: string;
}

const DealTimer: React.FC<CounterProps> = ({
  timerPrompt,
  discountEndDate,
}) => {
  const calculateTimeLeft = () => {
    const endTime = new Date(discountEndDate).getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      mins: Math.floor((difference / (1000 * 60)) % 60),
      secs: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [discountEndDate]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-[5px]">
        <h2 className="text-[16px] font-bold text-sheerpeace-black">
          {timerPrompt}
        </h2>
        <p className="text-gray-600 text-[11px]">Offer ends in:</p>
      </div>

      <div className="flex text-center gap-[5px]">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center gap-1">
            <div className="text-[14px] font-bold bg-sheerpeace-grey rounded-full h-[25px] w-[25px] flex justify-center items-center">
              {value}
            </div>
            <span className="text-[10px] text-gray-600 font-semibold">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealTimer;
