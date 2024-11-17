import { ReviewCardType } from "@/utils/types";
import ReviewCard from "./ReviewCard";

function ReviewsList({ reviews }: { reviews: ReviewCardType[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      {reviews.map((review) => {
        return <ReviewCard key={review.id} {...review} />;
      })}
    </div>
  );
}
export default ReviewsList;
