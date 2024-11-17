import { fetchFavouriteID } from "@/utils/actions";
import { SignInButton } from "@clerk/nextjs";
import FavouriteForm from "./FavouriteForm";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";

async function FavouriteButton({
  propertyID,
  isPropertyPage,
}: {
  propertyID: string;
  isPropertyPage: boolean;
}) {
  const { userId } = auth();

  if (!userId) {
    return (
      <SignInButton mode="modal">
        {isPropertyPage ? (
          <Button variant="outline" size="icon">
            <GoHeart size={20} />
          </Button>
        ) : (
          <button className="duration-300 hover:scale-105 ">
            <GoHeartFill
              size={24}
              stroke="#ffffff"
              strokeWidth={2}
              fill="#000000"
              fillOpacity="50%"
            />
          </button>
        )}
      </SignInButton>
    );
  }

  const favouriteID = await fetchFavouriteID({ propertyID });
  return (
    <FavouriteForm
      favouriteID={favouriteID}
      propertyID={propertyID}
      isPropertyPage={isPropertyPage}
    />
  );
}
export default FavouriteButton;
