export function formatPrice(value: number): string {
  const currencyAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return currencyAmount;
}

export function formatQuantity({
  item,
  value,
}: {
  item: string;
  value: number;
}): string {
  return value.toString() + " " + (value > 1 ? item + "s" : item);
}

export function formatDate(date: Date) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  return formattedDate;
}

export function getMonthYear(date: Date) {
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  }).format(date);
  return monthYear;
}
