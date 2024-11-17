import { LuStar } from "react-icons/lu";

function UserRating({
  rating,
  size = "default",
}: {
  rating: number;
  size?: "sm" | "default";
}) {
  const ratingValues = [1, 2, 3, 4, 5];
  return (
    <div className="mt-1 flex gap-x-[2px]">
      {ratingValues.map((value, index) => {
        return (
          <LuStar
            key={index}
            className={`${
              size === "default" ? "w-5 h-5" : "w-3 h-3"
            } stroke-primary ${value <= rating ? "fill-primary" : ""}`}
          />
        );
      })}
    </div>
  );
}
export default UserRating;
