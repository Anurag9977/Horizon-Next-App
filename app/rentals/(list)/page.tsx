import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import RentalsList from "@/components/rental/RentalsList";
import { fetchUserRentals } from "@/utils/actions";

async function RentalsPage() {
  const rentals = await fetchUserRentals();
  if (rentals.length === 0) {
    return (
      <EmptyList
        heading="You do not have any bookings currently."
        message="Please make a reservation."
        buttonText="return home"
      />
    );
  }

  return (
    <main>
      <SectionTitle title="your rentals" />
      <section className="mt-8">
        <RentalsList rentals={rentals} />
      </section>
    </main>
  );
}
export default RentalsPage;
