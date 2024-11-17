import { UserDetailsProps } from "@/utils/types";
import Image from "next/image";

function UserDetails({ profile }: { profile: UserDetailsProps }) {
  const { firstName, profileImage } = profile;
  return (
    <div className="flex items-center gap-x-4">
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className="h-10 w-10 lg:h-12 lg:w-12 object-cover rounded-full"
      />
      <div>
        <p className="lg:text-lg font-semibold">
          Hosted by <span className="capitalize">{firstName}</span>
        </p>
        <span className="text-sm lg:text-base text-muted-foreground">
          Superhost &#183; 2 years hosting
        </span>
      </div>
    </div>
  );
}
export default UserDetails;
