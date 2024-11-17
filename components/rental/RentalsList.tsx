import { RentalItem } from "@/utils/types";
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
import { formatPrice } from "@/utils/format";
import EditRentalButton from "./EditRentalButton";
import DeleteRentalButton from "./DeleteRentalButton";

function RentalsList({ rentals }: { rentals: RentalItem[] }) {
  return (
    <Table>
      <TableCaption className="mt-8 tracking-wide font-semibold text-base">
        Total Active Rentals : {rentals.length}
      </TableCaption>
      <TableHeader>
        <TableRow className="tracking-wide">
          <TableHead className="font-semibold">Property Name</TableHead>
          <TableHead className="font-semibold">
            Current Price (per night)
          </TableHead>
          <TableHead className="font-semibold">Total Nights Booked</TableHead>
          <TableHead className="font-semibold">Total Income Earned</TableHead>
          <TableHead className="text-right font-semibold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rentals.map((rental) => {
          const { id, name, price, totalNightsSum, orderTotalSum } = rental;

          return (
            <TableRow key={id}>
              <TableCell className="tracking-wide underline text-muted-foreground py-3">
                <Link href={`/properties/${id}`}>{name}</Link>
              </TableCell>
              <TableCell className="tracking-wide">
                {formatPrice(price)}
              </TableCell>
              <TableCell className="tracking-wide">{totalNightsSum}</TableCell>
              <TableCell className="tracking-wide">
                {formatPrice(orderTotalSum)}
              </TableCell>
              <TableCell className="text-right flex justify-end items-center gap-x-1">
                <EditRentalButton propertyID={id} />
                <DeleteRentalButton propertyID={id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default RentalsList;
