"use client";

import { useBookingStore } from "@/utils/store";
import { Booking } from "@/utils/types";
import { useEffect } from "react";
import BookingDatePicker from "./BookingDatePicker";
import BookingContainer from "./BookingContainer";
import SectionTitle from "../property/SectionTitle";

function BookingWrapper({
  price,
  propertyID,
  bookings,
}: {
  price: number;
  propertyID: string;
  bookings: Booking[];
}) {
  const { range } = useBookingStore((store) => store);

  useEffect(() => {
    useBookingStore.setState({
      price,
      propertyID,
      bookings,
      range: undefined,
    });
  }, []);

  const isValidRange = range && range.from && range.to;

  return (
    <section>
      <SectionTitle heading="Book your stay now!" />
      <div className="mt-4 px-8 py-6 flex flex-col gap-y-8 border rounded-lg shadow-sm">
        <BookingDatePicker />
        {isValidRange && <BookingContainer />}
      </div>
    </section>
  );
}
export default BookingWrapper;
