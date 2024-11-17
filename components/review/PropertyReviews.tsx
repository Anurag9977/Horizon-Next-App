import { fetchPropertyReviews } from "@/utils/actions";
import { ReviewCardType } from "@/utils/types";
import SectionTitle from "../global/SectionTitle";
import ReviewsList from "./ReviewsList";

async function PropertyReviews({ propertyID }: { propertyID: string }) {
  const reviews = await fetchPropertyReviews({ propertyID });

  if (reviews.length === 0) return null;

  const formattedReviews: ReviewCardType[] = reviews.map((review) => {
    const {
      id,
      rating,
      comment,
      profileID,
      profile: { firstName, profileImage, createdAt },
      updatedAt,
    } = review;
    const profileCreatedAt = createdAt.getFullYear().toString();

    return {
      type: "property",
      id,
      clerkID: profileID,
      rating,
      comment,
      title: firstName,
      subTitle: `Joined in ${profileCreatedAt}`,
      image: profileImage,
      updatedAt,
    };
  });

  return (
    <section id="reviews">
      <SectionTitle title="reviews" />
      <div className="mt-8">
        <ReviewsList reviews={formattedReviews} />
      </div>
    </section>
  );
}
export default PropertyReviews;
