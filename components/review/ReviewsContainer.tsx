import PropertyReviews from "./PropertyReviews";
import CreateReviewContainer from "./CreateReviewContainer";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import CardsLoader from "../global/CardsLoader";
import { fetchReviewID } from "@/utils/actions";
import ReviewsLoader from "./ReviewsLoader";
import SectionTitle from "../global/SectionTitle";

async function ReviewsContainer({
  propertyID,
  profileID,
}: {
  propertyID: string;
  profileID: string;
}) {
  const { userId } = auth();
  const isPropertyOwner = userId === profileID;
  const showReviewForm =
    userId && !isPropertyOwner && !(await fetchReviewID({ propertyID }));

  return (
    <main>
      <section>
        <Suspense
          fallback={
            <div>
              <SectionTitle title="reviews" />
              <section className="mt-8">
                <ReviewsLoader />
              </section>
            </div>
          }
        >
          <PropertyReviews propertyID={propertyID} />
        </Suspense>
      </section>
      <section className="mt-8">
        {showReviewForm && <CreateReviewContainer propertyID={propertyID} />}
      </section>
    </main>
  );
}
export default ReviewsContainer;
