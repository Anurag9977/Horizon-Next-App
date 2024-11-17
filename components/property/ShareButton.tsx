"use client";

import { LuShare2 } from "react-icons/lu";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

function ShareButton({
  name,
  tagline,
  propertyID,
}: {
  name: string;
  tagline: string;
  propertyID: string;
}) {
  const sharedPageURL = `${process.env.NEXT_PUBLIC_APP_URL}/properties/${propertyID}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <LuShare2 size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={10}
        className="w-max flex justify-center items-center gap-x-2"
      >
        <FacebookShareButton hashtag={name} url={sharedPageURL}>
          <FacebookIcon className="h-6 w-6 lg:h-8 lg:w-8 rounded-full" />
        </FacebookShareButton>
        <TwitterShareButton
          title={name}
          hashtags={[name, tagline, "horizon"]}
          url={sharedPageURL}
        >
          <XIcon className="h-6 w-6 lg:h-8 lg:w-8 rounded-full" />
        </TwitterShareButton>
        <LinkedinShareButton title={name} url={sharedPageURL}>
          <LinkedinIcon className="h-6 w-6 lg:h-8 lg:w-8 rounded-full" />
        </LinkedinShareButton>
      </PopoverContent>
    </Popover>
  );
}
export default ShareButton;
