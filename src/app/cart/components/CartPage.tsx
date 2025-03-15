"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { usePrice } from "@/utils/usePrice";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import QuantityUpdater from "@/components/product/quantityUpdater";
import { Trash } from "lucide-react";

export default function CartPage() {
  const [shipping, setShipping] = useState("free");
  const [coupon, setCoupon] = useState("");
  const { formatPrice } = usePrice();

  const { cart, removeItem } = useCartStore();

  const router = useRouter();

  // Prices
  const subtotal = cart?.total_price || "0";
  const shippingCost =
    shipping === "free" ? 0 : shipping === "express" ? 15.0 : 21.0;
  const total = JSON.parse(cart?.total_price || "0") + shippingCost;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-[20px] items-center px-4 py-8">
      <h1 className="text-sheerpeace-black text-[40px] font-bold">Cart</h1>
      {/* Tabs Navigation */}
      {cart?.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven&rsquo;t added anything to your cart yet.
          </p>
          <Button onClick={() => router.push("/")}>Start Shopping</Button>
        </div>
      ) : (
        <Tabs
          defaultValue="shopping-cart"
          className="min-w-[60vw] sm:min-w-[70vw]"
        >
          <TabsList className="w-full flex justify-between bg-transparent text-white rounded-lg p-2">
            <TabsTrigger
              value="shopping-cart"
              className="w-1/3 text-center text-sheerpeace-black sm:flex data-[state=active]:w-full sm:data-[state=active]:w-1/3 pb-[15px] hidden data-[state=active]:flex flex-row gap-[10px] items-center data-[state=active]:border-b-sheerpeace-black data-[state=active]:border-b-[1.5px] rounded-none data-[state=active]:shadow-none [&>*:first-child]:data-[state=active]:bg-sheerpeace-black"
            >
              <div className="h-[40px] w-[40px] rounded-full bg-gray-400 text-white flex items-center justify-center">
                1
              </div>
              <span>Shopping Cart</span>
            </TabsTrigger>
            <TabsTrigger
              value="checkout-details"
              className="w-1/3 text-center text-sheerpeace-black sm:flex data-[state=active]:w-full sm:data-[state=active]:w-1/3 pb-[15px] hidden data-[state=active]:flex flex-row gap-[10px] items-center data-[state=active]:border-b-sheerpeace-black data-[state=active]:border-b-[1.5px] rounded-none data-[state=active]:shadow-none [&>*:first-child]:data-[state=active]:bg-sheerpeace-black"
            >
              <div className="h-[40px] w-[40px] rounded-full bg-gray-400 text-white flex items-center justify-center">
                2
              </div>
              <span>Checkout Details</span>
            </TabsTrigger>
            <TabsTrigger
              value="order-complete"
              className="w-1/3 text-center text-sheerpeace-black sm:flex data-[state=active]:w-full sm:data-[state=active]:w-1/3 pb-[15px] hidden data-[state=active]:flex flex-row gap-[10px] items-center data-[state=active]:border-b-sheerpeace-black data-[state=active]:border-b-[1.5px] rounded-none data-[state=active]:shadow-none [&>*:first-child]:data-[state=active]:bg-sheerpeace-black"
            >
              <div className="h-[40px] w-[40px] rounded-full bg-gray-400 text-white flex items-center justify-center">
                3
              </div>
              <span>Order Complete</span>
            </TabsTrigger>
          </TabsList>

          {/* Shopping Cart Tab */}
          <TabsContent value="shopping-cart">
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* Cart List */}
              <div className="flex-1">
                <Card className="shadow-none border-none">
                  <CardContent>
                    {cart?.items?.map((item) => (
                      <div key={item.product_id} className="flex py-3 border-b">
                        <div className="h-[150px] w-[100px] rounded-[5px] overflow-hidden">
                          <Image
                            src={renderImageUrl(item.product.images[0])}
                            height={300}
                            width={300}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-[5px] justify-between p-[15px]">
                          <div className="flex flex-col gap-[10px]">
                            <p className="font-semibold">{item.product.name}</p>

                            <span className="text-sheerpeace-purple-secondary">{formatPrice(item.product.price)}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <QuantityUpdater cartItem={item} />
                            <Button
                              className="text-sheerpeace-black bg-transparent hover:bg-sheerpeace-purple"
                              size="sm"
                              onClick={() => item.id && removeItem(item.id)}
                            >
                              <Trash />
                              <span>Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Checkout Summary */}
              <div className="w-full md:w-[350px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Shipping Options */}
                    <RadioGroup defaultValue="free" onValueChange={setShipping}>
                      <Card
                        className={`p-4 mb-2 cursor-pointer ${
                          shipping === "free"
                            ? "border-sheerpeace-purple-primary"
                            : "border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value="free" id="free" />
                        <Label htmlFor="free" className="ml-2">
                          Free Shipping - $0.00
                        </Label>
                      </Card>
                      <Card
                        className={`p-4 mb-2 cursor-pointer ${
                          shipping === "express"
                            ? "border-sheerpeace-purple-primary"
                            : "border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="ml-2">
                          Express Shipping - $15.00
                        </Label>
                      </Card>
                      <Card
                        className={`p-4 mb-2 cursor-pointer ${
                          shipping === "pickup"
                            ? "border-sheerpeace-purple-primary"
                            : "border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="ml-2">
                          Pick Up - $21.00
                        </Label>
                      </Card>
                    </RadioGroup>

                    {/* Pricing Summary */}
                    <Separator className="my-4" />
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{formatPrice(JSON.parse(subtotal || "0"))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>{formatPrice(shippingCost)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>{formatPrice(JSON.parse(total || "0"))}</span>
                    </div>

                    {/* Checkout Button */}
                    <Button className="w-full mt-4">Checkout</Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Have a Coupon?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm mb-2">
                    Add your code for an instant cart discount
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon Code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button>Apply</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Checkout Details Tab */}
          <TabsContent value="checkout-details">
            <Card>
              <CardHeader>
                <CardTitle>Checkout Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Billing and shipping details go here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order Complete Tab */}
          <TabsContent value="order-complete">
            <Card>
              <CardHeader>
                <CardTitle>Order Complete</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Your order has been placed successfully! 🎉
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
