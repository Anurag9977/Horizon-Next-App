import BookingsList from "@/components/booking/BookingsList";
import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchUserBookings } from "@/utils/actions";

async function BookingsPage() {
  const bookings = await fetchUserBookings();
  if (bookings.length === 0) {
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
      <SectionTitle title="your bookings" />
      <section className="mt-8">
        <BookingsList bookings={bookings} />
      </section>
    </main>
  );
}
export default BookingsPage;
