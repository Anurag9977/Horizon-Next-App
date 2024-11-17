import { getUserNameAndImage } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

async function UserIcon() {
  const user = await currentUser();
  if (!user) {
    return <CircleUserRound size={22} />;
  }

  const getProfileImage = await getUserNameAndImage();
  const userImage = getProfileImage
    ? getProfileImage.profileImage
    : user.imageUrl;

  return (
    <Image
      src={userImage}
      alt="profile-image"
      width={24}
      height={24}
      className="object-cover rounded-full w-6 h-6"
    />
  );
}
export default UserIcon;
