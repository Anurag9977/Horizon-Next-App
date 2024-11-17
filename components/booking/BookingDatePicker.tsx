"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LuCalendar } from "react-icons/lu";
import { formatPrice } from "@/utils/format";
import { useBookingStore } from "@/utils/store";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { Separator } from "../ui/separator";
import { isDisabledDate, isInvalidDateRangeSelected } from "@/utils/calendar";
import { Booking } from "@/utils/types";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { chillax } from "@/utils/fonts";

const currentDate = new Date();

function BookingDatePicker() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { price, bookings, range } = useBookingStore((store) => store);

  useEffect(() => {
    if (range && range.from && range.to) setPopoverOpen(false);
  }, [range]);

  return (
    <section>
      <h1 className={`${chillax.className} text-2xl tracking-wide`}>
        {formatPrice(price)}
        <span className="text-xl"> night</span>
      </h1>
      <Popover open={popoverOpen} onOpenChange={(open) => setPopoverOpen(open)}>
        <PopoverTrigger asChild className="mt-4">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group px-4 cursor-pointer"
          >
            <div className="h-max grid grid-cols-[1fr_auto_1fr]">
              {renderDateSelector({
                heading: "check-in",
                subHeading: range?.from
                  ? range.from.toLocaleDateString()
                  : "Add date",
              })}
              <Separator className="h-full w-[1px] mx-4 group-hover:bg-background" />
              {renderDateSelector({
                heading: "check-out",
                subHeading: range?.to
                  ? range.to.toLocaleDateString()
                  : "Add date",
              })}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={10}
          className="p-1 w-max bg-background"
        >
          {renderCalendar({ range, bookings })}
        </PopoverContent>
      </Popover>
    </section>
  );
}

function renderCalendar({
  range,
  bookings,
}: {
  range: DateRange | undefined;
  bookings: Booking[];
}) {
  return (
    <Calendar
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
  );
}

function renderDateSelector({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) {
  return (
    <div className="py-2">
      <h1 className="mb-2 flex justify-between items-center capitalize tracking-wider text-xs font-semibold">
        {heading}
        <LuCalendar className="text-muted-foreground text-sm" />
      </h1>
      <span
        className={`w-full tracking-wide ${
          subHeading === "Add date" ? "text-base" : "font-semibold text-base"
        }`}
      >
        {subHeading}
      </span>
    </div>
  );
}

export default BookingDatePicker;
