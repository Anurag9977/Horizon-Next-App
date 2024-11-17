import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewsList from "@/components/review/ReviewsList";
import { fetchUserReviews } from "@/utils/actions";
import { getCountryByCode } from "@/utils/countries";
import { ReviewCardType } from "@/utils/types";

async function ReviewsPage() {
  const reviews = await fetchUserReviews();

  if (reviews.length === 0)
    return (
      <EmptyList
        heading="You have not added any reviews yet."
        message="Please share your feedback for any property."
        buttonText="return home"
      />
    );

  const formattedReviews: ReviewCardType[] = reviews.map((review) => {
    const {
      id,
      rating,
      comment,
      profileID,
      propertyID,
      property: { name, propertyImage, country },
      updatedAt,
    } = review;
    return {
      type: "user",
      id,
      clerkID: profileID,
      rating,
      comment,
      title: name,
      subTitle: getCountryByCode(country).name,
      href: propertyID,
      image: propertyImage,
      updatedAt,
    };
  });

  return (
    <main>
      <SectionTitle title="your reviews" />
      <section className="mt-8">
        <ReviewsList reviews={formattedReviews} />
      </section>
    </main>
  );
}
export default ReviewsPage;
