import Link from "next/link";
import { Tent } from "lucide-react";
import { chillax } from "@/utils/fonts";
function Logo() {
  return (
    <Link href="/" className="flex gap-x-2 text-primary">
      <Tent size={28} strokeWidth={2.3} />
      <h1
        className={`${chillax.className} tracking-wide font-semibold text-2xl`}
      >
        horizon
      </h1>
    </Link>
  );
}
export default Logo;
