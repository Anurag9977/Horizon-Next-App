import { ReviewCardType } from "@/utils/types";
import Image from "next/image";
import UserRating from "./UserRating";
import DeleteReviewButton from "./DeleteReviewButton";
import { auth } from "@clerk/nextjs/server";
import EditReviewButton from "./EditReviewButton";
import Link from "next/link";
import Comment from "./Comment";
import { formatDate } from "@/utils/format";

function ReviewCard({
  type,
  id,
  rating,
  comment,
  clerkID,
  title,
  subTitle,
  href,
  image,
  updatedAt,
}: ReviewCardType) {
  const { userId } = auth();

  return (
    <article className="relative border rounded-lg px-6 py-4">
      <div className="flex items-center gap-x-2">
        <div
          className={`relative ${type === "user" ? "h-12 w-16" : "h-10 w-10"}`}
        >
          <Image
            src={image}
            alt="profile-image"
            fill
            sizes="5vw"
            className={`h-full w-full object-cover ${
              type === "user" ? "rounded-sm" : "rounded-full"
            }`}
          />
        </div>
        <div>
          {type === "user" ? (
            <Link
              href={`/properties/${href}`}
              className="font-semibold capitalize tracking-wide hover:underline duration-300"
            >
              {title}
            </Link>
          ) : (
            <h1 className="font-semibold capitalize tracking-wide">{title}</h1>
          )}
          <p className="text-sm italic text-muted-foreground">{subTitle}</p>
        </div>
      </div>
      <div className="my-4 flex gap-x-2">
        <UserRating rating={rating} size="sm" />
        <span className="text-sm text-muted-foreground font-bold">&#183;</span>
        <span className="text-sm text-muted-foreground italic">
          {formatDate(updatedAt)}
        </span>
      </div>
      <Comment comment={comment} />

      {/* Edit and Delete Review Buttons */}
      {clerkID === userId && (
        <div className="absolute top-3 right-1 flex flex-wrap items-center">
          {/* Edit Review Dialog */}
          <EditReviewButton reviewID={id} rating={rating} comment={comment} />
          {/* Delete Review Button */}
          <DeleteReviewButton reviewID={id} />
        </div>
      )}
    </article>
  );
}
export default ReviewCard;
