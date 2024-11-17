import Link from "next/link";
import { LuPenSquare } from "react-icons/lu";
import { Button } from "../ui/button";

function EditRentalButton({ propertyID }: { propertyID: string }) {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href={`/rentals/${propertyID}/edit`}>
        <LuPenSquare className="text-blue-500" />
      </Link>
    </Button>
  );
}
export default EditRentalButton;
