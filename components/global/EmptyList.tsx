import Link from "next/link";
import { Button } from "../ui/button";

function EmptyList({
  heading = "items",
  message = "please try again",
  buttonText = "back to home",
}: {
  heading?: string;
  message?: string;
  buttonText?: string;
}) {
  return (
    <section>
      <h1 className="text-lg font-semibold tracking-wide">{heading}</h1>
      <p className="text-base">{message}</p>
      <Button asChild>
        <Link href="/" className="mt-4 tracking-wide font-semibold capitalize">
          {buttonText}
        </Link>
      </Button>
    </section>
  );
}
export default EmptyList;
