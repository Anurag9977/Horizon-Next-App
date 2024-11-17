import { fetchReviewStats } from "@/utils/actions";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

async function PropertyRating({
  propertyID,
  size = "default",
  showReviews = false,
}: {
  propertyID: string;
  size?: "default" | "lg";
  showReviews?: boolean;
}) {
  const { averageRating, totalReviews } = await fetchReviewStats({
    propertyID,
  });

  if (totalReviews === 0) {
    return null;
  }

  const ratingClasses = size === "default" ? "h-3 w-3" : "h-4 w-4 mb-1";

  return (
    <div className="flex items-center gap-x-1">
      <FaStar className={ratingClasses} />
      <span
        className={`tracking-wide ${
          size === "default" ? "text-base" : "text-lg"
        }`}
      >
        {averageRating}
      </span>
      {showReviews && (
        <>
          {" "}
          &#183;{" "}
          <Link
            href="#reviews"
            className={`ml-1 capitalize underline ${
              size === "default" ? "text-base" : "text-lg"
            }`}
          >
            {totalReviews} review{totalReviews > 1 ? "s" : ""}
          </Link>
        </>
      )}
    </div>
  );
}
export default PropertyRating;
