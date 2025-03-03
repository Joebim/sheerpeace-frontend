import React from "react";
import BenefitCard from "./BenefitCard";
import { Banknote, HelpingHand, Phone, Truck } from "lucide-react";

export default function BenefitSection() {
  const benefits = [
    {
      id: 1,
      Icon: Truck,
      title: "Free Shipping",
      description: "Order above $200",
    },
    {
      id: 2,
      Icon: HelpingHand,
      title: "Money-back",
      description: "30 days guarantee",
    },
    {
      id: 3,
      Icon: Banknote,
      title: "Secure Payments",
      description: "Secured by Stripe",
    },
    {
      id: 4,
      Icon: Phone,
      title: "24/7 Support",
      description: "Phone and Email support",
    },
  ];

  return (
    <div className="flex flex-col gap-[10px]">
      {benefits.map((benefit) => (
        <BenefitCard key={benefit.id} benefit={benefit} />
      ))}
    </div>
  );
}
