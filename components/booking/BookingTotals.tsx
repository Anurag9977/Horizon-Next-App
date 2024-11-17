"use client";

import { getNumberOfNights } from "@/utils/calendar";
import { useBookingStore } from "@/utils/store";
import { Separator } from "../ui/separator";
import { getOrderTotals } from "@/utils/booking";
import { formatPrice } from "@/utils/format";

function BookingTotals() {
  const { price, range } = useBookingStore((store) => store);
  const numberOfNights = getNumberOfNights(range) as number;
  const { subTotal, tax, convenienceFee, orderTotal } = getOrderTotals({
    price,
    numberOfNights,
  });

  return (
    <section>
      <div className="flex justify-between items-center lg:text-sm xl:text-base">
        <p className="capitalize">
          subtotal {`(${price} * ${numberOfNights} nights)`}
        </p>
        <p className="tracking-wide">{formatPrice(subTotal)}</p>
      </div>
      <Separator className="mb-2" />
      <div className="flex justify-between items-center lg:text-sm xl:text-base">
        <p className="capitalize">service tax</p>
        <p className="tracking-wide">{formatPrice(tax)}</p>
      </div>
      <Separator className="mb-2" />
      <div className="flex justify-between items-center lg:text-sm xl:text-base">
        <p className="capitalize">convenience fee</p>
        <p className="tracking-wide">{formatPrice(convenienceFee)}</p>
      </div>
      <Separator className="mb-2" />
      <div className="flex justify-between items-center lg:text-base xl:text-lg">
        <p className="capitalize tracking-wide font-semibold">grand total</p>
        <p className="tracking-wide font-semibold">{formatPrice(orderTotal)}</p>
      </div>
    </section>
  );
}
export default BookingTotals;
