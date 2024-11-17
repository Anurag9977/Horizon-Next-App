"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function Comment({ comment }: { comment: string }) {
  const [showComment, setShowComment] = useState(false);

  const words = comment.split(" ");

  const isLongComment = words.length > 15;

  return (
    <h1 className="text-sm lg:text-base leading-relaxed">
      {isLongComment && !showComment
        ? words.splice(0, 15).join(" ") + "..."
        : comment}
      {isLongComment && (
        <Button
          variant="link"
          type="button"
          className="block h-auto text-xs lg:text-sm p-0 mt-1 capitalize font-bold"
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          {showComment ? "show less" : "read more"}
        </Button>
      )}
    </h1>
  );
}
export default Comment;
