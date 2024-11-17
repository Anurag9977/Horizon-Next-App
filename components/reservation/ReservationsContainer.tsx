import { fetchReservationsOnUserRentals } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ReservationsList from "./ReservationsList";

async function ReservationsContainer() {
  const reservations = await fetchReservationsOnUserRentals();
  if (reservations.length === 0) {
    return (
      <EmptyList
        heading="You do not have any reservations on any property."
        message="Please wait for someone to make a reservation."
        buttonText="return home"
      />
    );
  }
  return (
    <main>
      <SectionTitle title="your reservations" />
      <section className="mt-8">
        <ReservationsList reservations={reservations} />
      </section>
    </main>
  );
}
export default ReservationsContainer;
