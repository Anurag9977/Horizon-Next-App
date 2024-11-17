"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import CreateReview from "./CreateReview";

function CreateReviewContainer({ propertyID }: { propertyID: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  return (
    <section>
      <Button
        variant={isReviewFormVisible ? "outline" : "default"}
        onClick={() => {
          setIsReviewFormVisible(!isReviewFormVisible);
        }}
        className="tracking-wide font-semibold"
      >
        {isReviewFormVisible ? "Cancel" : "Leave a Review"}
      </Button>
      {isReviewFormVisible && (
        <div className="mt-4">
          <CreateReview propertyID={propertyID} />
        </div>
      )}
    </section>
  );
}
export default CreateReviewContainer;
