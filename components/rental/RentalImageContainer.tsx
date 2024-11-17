"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import UpdateRentalImage from "./UpdateRentalImage";

function RentalImageContainer({
  name,
  rentalImage,
  propertyID,
}: {
  name: string;
  rentalImage: string;
  propertyID: string;
}) {
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  return (
    <section>
      <h1 className="mb-6 capitalize tracking-wide text-lg font-semibold">
        property image
      </h1>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="relative h-44">
          <Image
            src={rentalImage}
            alt={name}
            priority
            fill
            sizes="(max-width : 596px) 100vw 50vw"
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        <div>
          {showUpdateButton && (
            <UpdateRentalImage propertyID={propertyID} imageURL={rentalImage} />
          )}
          <Button
            type="button"
            className="capitalize tracking-wide font-semibold w-max"
            variant={showUpdateButton ? "outline" : "secondary"}
            onClick={() => setShowUpdateButton(!showUpdateButton)}
          >
            {showUpdateButton ? "cancel" : "update image?"}
          </Button>
        </div>
      </div>
    </section>
  );
}
export default RentalImageContainer;
