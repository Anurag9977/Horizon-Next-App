import DeleteBookingForm from "./DeleteBookingForm";

function DeleteBookingButton({ bookingID }: { bookingID: string }) {
  return <DeleteBookingForm bookingID={bookingID} />;
}
export default DeleteBookingButton;
