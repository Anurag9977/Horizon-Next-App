"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

function NavSearch() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearchTerm("");
    }
  }, [searchParams.get("search")]);

  return (
    <Input
      name="search"
      type="text"
      placeholder="Search destinations..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
      }}
      className="bg-primary-foreground dark:bg-muted max-w-xs tracking-wide"
    />
  );
}
export default NavSearch;
