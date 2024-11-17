import SectionTitle from "@/components/global/SectionTitle";
import CreateProfile from "@/components/profile/CreateProfile";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreateProfilePage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const hasProfile = (await clerkClient().users.getUser(user.id))
    .privateMetadata.hasProfile;
  if (hasProfile) redirect("/");

  return (
    <main>
      <SectionTitle title="create your profile" />
      <section className="mt-4">
        <CreateProfile />
      </section>
    </main>
  );
}
export default CreateProfilePage;
