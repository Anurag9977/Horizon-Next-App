import { create } from "zustand";
import { Booking } from "./types";
import { DateRange } from "react-day-picker";

type BookingStore = {
  propertyID: string;
  price: number;
  bookings: Booking[];
  range: DateRange | undefined;
};

export const useBookingStore = create<BookingStore>(() => {
  return {
    propertyID: "",
    price: 0,
    bookings: [],
    range: undefined,
  };
});
