"use client";

import { DateRange } from "react-day-picker";
import { CalendarLarge } from "../ui/calendar-large";
import SectionTitle from "../property/SectionTitle";
import { useBookingStore } from "@/utils/store";
import {
  getNumberOfNights,
  isDisabledDate,
  isInvalidDateRangeSelected,
} from "@/utils/calendar";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Booking } from "@/utils/types";
import { useEffect } from "react";
import BookingContainer from "./BookingContainer";
import { formatDate } from "@/utils/format";

function BookingCalendar({
  price,
  propertyID,
  bookings,
}: {
  price: number;
  propertyID: string;
  bookings: Booking[];
}) {
  const currentDate = new Date();

  const { range } = useBookingStore((store) => store);
  const isValidRange = range && range.from && range.to;
  const numberOfNights = getNumberOfNights(range);

  useEffect(() => {
    useBookingStore.setState({
      price,
      propertyID,
      bookings,
      range: undefined,
    });
  }, []);

  return (
    <section className="flex flex-col">
      <SectionTitle
        heading={
          numberOfNights
            ? `${numberOfNights} nights planned`
            : "Check availability"
        }
        subHeading={
          isValidRange
            ? `${formatDate(range.from as Date)} - ${formatDate(
                range.to as Date
              )}`
            : "Add your travel dates for exact pricing"
        }
      />
      <div className="w-full mt-4 px-1 py-2 border rounded-lg shadow-sm">
        <CalendarLarge
          mode="range"
          numberOfMonths={2}
          defaultMonth={currentDate}
          selected={range}
          onSelect={(selectedDateRange, selectedDay) => {
            let newDateRange: DateRange | undefined = {
              from: undefined,
              to: undefined,
            };
            if (range && range.from && range.to) {
              newDateRange.from = selectedDay;
            } else {
              newDateRange = selectedDateRange;
            }

            if (
              isInvalidDateRangeSelected({
                dateRange: newDateRange,
                bookedRanges: bookings,
              })
            ) {
              useBookingStore.setState({
                range: undefined,
              });
              toast({
                variant: "destructive",
                title: "Property already booked during selected dates.",
                description: "Please try checking for some other dates.",
              });
            } else {
              useBookingStore.setState({
                range: newDateRange,
              });
            }
          }}
          disabled={(date) => isDisabledDate({ date, bookedDates: bookings })}
        />
      </div>
      <Button
        variant="ghost"
        className="mt-2 self-end capitalize text-foreground tracking-wide font-semibold underline"
        onClick={() => useBookingStore.setState({ range: undefined })}
      >
        clear dates
      </Button>
      {isValidRange && (
        <div className="lg:hidden mt-4 px-8 py-6 flex flex-col gap-y-8 border rounded-lg shadow-sm">
          <BookingContainer />
        </div>
      )}
    </section>
  );
}
export default BookingCalendar;
