import EditReviewForm from "./EditReviewForm";

function EditReviewButton({
  reviewID,
  rating,
  comment,
}: {
  reviewID: string;
  rating: number;
  comment: string;
}) {
  return (
    <EditReviewForm reviewID={reviewID} rating={rating} comment={comment} />
  );
}
export default EditReviewButton;
