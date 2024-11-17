import DeleteReviewForm from "./DeleteReviewForm";

function DeleteReviewButton({ reviewID }: { reviewID: string }) {
  return <DeleteReviewForm reviewID={reviewID} />;
}
export default DeleteReviewButton;
