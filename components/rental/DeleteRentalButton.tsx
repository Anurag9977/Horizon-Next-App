import DeleteRentalForm from "./DeleteRentalForm";

function DeleteRentalButton({ propertyID }: { propertyID: string }) {
  return <DeleteRentalForm propertyID={propertyID} />;
}
export default DeleteRentalButton;
