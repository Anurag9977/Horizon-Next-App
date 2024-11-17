import { categories } from "@/utils/categories";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

function CategoriesList({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  return (
    <ScrollArea className="w-full whitespace-nowrap h-16">
      <section className="grid grid-flow-col justify-between gap-x-6">
        {categories.map((item, index) => {
          const isActive = item.label === category;
          return (
            <Link
              href={
                search
                  ? `?search=${search}&category=${category}`
                  : `?category=${item.label}`
              }
              key={index}
              className={`relative flex flex-col items-center gap-y-2 cursor-pointer hover:text-primary duration-300 ${
                isActive &&
                "text-primary after:absolute after:-bottom-1 after:h-[2px] after:w-full after:bg-primary"
              }`}
            >
              <item.icon className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.2]" />
              <span className="text-xs lg:text-sm capitalize tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
export default CategoriesList;
