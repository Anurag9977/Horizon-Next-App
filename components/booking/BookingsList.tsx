import { BookingItem } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { formatDate, formatPrice } from "@/utils/format";
import CountryAndFlag from "../property/CountryAndFlag";
import { getCountryByCode } from "@/utils/countries";
import DeleteBookingButton from "./DeleteBookingButton";

function BookingsList({ bookings }: { bookings: BookingItem[] }) {
  return (
    <Table>
      <TableCaption className="mt-8 tracking-wide font-semibold text-base">
        Total Bookings : {bookings.length}
      </TableCaption>
      <TableHeader>
        <TableRow className="tracking-wide">
          <TableHead className="font-semibold">Property Name</TableHead>
          <TableHead className="font-semibold">Country</TableHead>
          <TableHead className="font-semibold w-32">Total Nights</TableHead>
          <TableHead className="font-semibold">Grand Total</TableHead>
          <TableHead className="font-semibold">Booked On</TableHead>
          <TableHead className="font-semibold">Check-In</TableHead>
          <TableHead className="font-semibold">Check-Out</TableHead>
          <TableHead className="text-right font-semibold w-4">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => {
          const {
            id,
            totalNights,
            orderTotal,
            checkIn,
            checkOut,
            createdAt,
            property: { id: propertyID, country, name },
          } = booking;
          const { name: countryName, code } = getCountryByCode(country);

          return (
            <TableRow key={id}>
              <TableCell className="tracking-wide underline text-muted-foreground py-3">
                <Link href={`/properties/${propertyID}`}>{name}</Link>
              </TableCell>
              <TableCell>
                <CountryAndFlag countryName={countryName} countryCode={code} />
              </TableCell>
              <TableCell className="text-center tracking-wide">
                {totalNights}
              </TableCell>
              <TableCell className="tracking-wide">
                {formatPrice(orderTotal)}
              </TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
              <TableCell>{formatDate(checkIn)}</TableCell>
              <TableCell>{formatDate(checkOut)}</TableCell>
              <TableCell className="text-right">
                <DeleteBookingButton bookingID={id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default BookingsList;
