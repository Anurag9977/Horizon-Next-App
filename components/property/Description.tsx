"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function Description({ description }: { description: string }) {
  const [showDescription, setShowDescription] = useState(false);

  const words = description.split(" ");

  const isLongDescription = words.length > 35;

  return (
    <div>
      <p className="text-sm lg:text-base text-justify !leading-relaxed">
        {isLongDescription && !showDescription
          ? words.splice(0, 35).join(" ") + "..."
          : description}
        {isLongDescription && (
          <Button
            type="button"
            variant="link"
            className="block h-auto mt-1 p-0 text-xs lg:text-sm text-primary capitalize font-semibold"
            onClick={() => {
              setShowDescription(!showDescription);
            }}
          >
            {showDescription ? "show less" : "read more"}
          </Button>
        )}
      </p>
    </div>
  );
}
export default Description;
