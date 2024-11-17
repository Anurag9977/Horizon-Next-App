import { DateRange } from "react-day-picker";
import { Booking } from "./types";

function getDateWithZeroHours(date: Date) {
  date.setHours(0, 0, 0, 0);
  return date;
}

function getCurrentDate(): Date {
  const currentDate = new Date();
  return getDateWithZeroHours(currentDate);
}

export function isDisabledDate({
  date,
  bookedDates,
}: {
  date: Date;
  bookedDates: Booking[];
}): boolean {
  const currentDate = getCurrentDate();

  const isAlreadyBooked = bookedDates.some((range) => {
    const checkIn = getDateWithZeroHours(range.checkIn);
    const checkOut = getDateWithZeroHours(range.checkOut);

    return date >= checkIn && date <= checkOut;
  });

  return date < currentDate || isAlreadyBooked;
}

export function isInvalidDateRangeSelected({
  dateRange,
  bookedRanges,
}: {
  dateRange: DateRange | undefined;
  bookedRanges: Booking[];
}): boolean {
  if (!dateRange || !dateRange.from || !dateRange.to) return false;

  return bookedRanges.some((range) => {
    const checkIn = getDateWithZeroHours(range.checkIn);
    const checkOut = getDateWithZeroHours(range.checkOut);

    return (
      isDisabledDate({ date: dateRange.from!, bookedDates: bookedRanges }) ||
      isDisabledDate({ date: dateRange.to!, bookedDates: bookedRanges }) ||
      (dateRange.from! < checkIn && dateRange.to! > checkOut)
    );
  });

  /* 
  Booked Range in October

                                                  20 ------------------------------ 30 
  
  Selected Range in October
  
  10 -----------------------------------------------------31
  
  */
}

export function getNumberOfNights(
  dateRange: DateRange | undefined
): number | undefined {
  if (!dateRange || !dateRange.from || !dateRange.to) return undefined;

  const startDateInMs = dateRange.from.getTime();
  const endDateInMs = dateRange.to.getTime();

  return (endDateInMs - startDateInMs) / (24 * 60 * 60 * 1000);
}
