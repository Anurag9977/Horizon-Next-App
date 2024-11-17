import { OrderTotalType } from "./types";

export function getOrderTotals({
  price,
  numberOfNights,
}: {
  price: number;
  numberOfNights: number;
}): OrderTotalType {
  const subTotal = price * numberOfNights;
  const tax = 0.1 * subTotal;
  const convenienceFee = 5;
  const orderTotal = subTotal + tax + convenienceFee;

  return { subTotal, tax, convenienceFee, orderTotal };
}
