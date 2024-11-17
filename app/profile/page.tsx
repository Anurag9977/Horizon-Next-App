import SectionTitle from "@/components/global/SectionTitle";
import ProfileImageContainer from "@/components/profile/ProfileImageContainer";
import UpdateProfile from "@/components/profile/UpdateProfile";
import { getProfile } from "@/utils/actions";

async function ProfilePage() {
  const userProfile = await getProfile();
  const { firstName, lastName, username, profileImage } = userProfile;
  return (
    <main>
      <SectionTitle title="your profile" />
      <section className="mt-4 grid lg:grid-cols-[1fr_auto] gap-4">
        <UpdateProfile
          firstName={firstName}
          lastName={lastName}
          username={username}
        />
        <ProfileImageContainer profileImage={profileImage} />
      </section>
    </main>
  );
}
export default ProfilePage;
