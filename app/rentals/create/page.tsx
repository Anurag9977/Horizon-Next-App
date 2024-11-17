import SectionTitle from "@/components/global/SectionTitle";
import CreateRental from "@/components/rental/CreateRental";

function CreateRentalPage() {
  return (
    <main>
      <SectionTitle title="create a rental" />
      <section className="mt-8">
        <CreateRental />
      </section>
    </main>
  );
}
export default CreateRentalPage;
