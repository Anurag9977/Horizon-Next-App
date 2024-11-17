import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getCountryByCode } from "@/utils/countries";
import Link from "next/link";
import CountryAndFlag from "../property/CountryAndFlag";
import { formatDate, formatPrice } from "@/utils/format";
import { ReservationItem } from "@/utils/types";

function ReservationsList({
  reservations,
}: {
  reservations: ReservationItem[];
}) {
  return (
    <Table>
      <TableCaption className="mt-8 tracking-wide font-semibold text-base">
        Total Reservations : {reservations.length}
      </TableCaption>
      <TableHeader>
        <TableRow className="tracking-wide">
          <TableHead className="font-semibold">Property Name</TableHead>
          <TableHead className="font-semibold">Country</TableHead>
          <TableHead className="pl-4 font-semibold">Guest Name</TableHead>
          <TableHead className="font-semibold">Booked On</TableHead>
          <TableHead className="font-semibold">Check-In</TableHead>
          <TableHead className="font-semibold">Check-Out</TableHead>
          <TableHead className="font-semibold w-32">Total Nights</TableHead>
          <TableHead className="text-right font-semibold">
            Grand Total
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => {
          const {
            id,
            profile: { firstName },
            totalNights,
            orderTotal,
            checkIn,
            checkOut,
            createdAt,
            property: { id: propertyID, country, name },
          } = reservation;
          const { name: countryName, code } = getCountryByCode(country);
          return (
            <TableRow key={id}>
              <TableCell className="tracking-wide underline text-muted-foreground py-3">
                <Link href={`/properties/${propertyID}`}>{name}</Link>
              </TableCell>
              <TableCell>
                <CountryAndFlag countryName={countryName} countryCode={code} />
              </TableCell>
              <TableCell className="pl-4 tracking-wide">{firstName}</TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
              <TableCell>{formatDate(checkIn)}</TableCell>
              <TableCell>{formatDate(checkOut)}</TableCell>
              <TableCell className="text-center tracking-wide">
                {totalNights}
              </TableCell>
              <TableCell className="text-right tracking-wide">
                {formatPrice(orderTotal)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default ReservationsList;
