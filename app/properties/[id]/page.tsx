import FavouriteButton from "@/components/favourite/FavouriteButton";
import ShareButton from "@/components/property/ShareButton";
import { Separator } from "@/components/ui/separator";
import { fetchPropertyDetails } from "@/utils/actions";
import { getCountryByCode } from "@/utils/countries";
import { PropertyDetailsProps } from "@/utils/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";
import BreadCrumbs from "@/components/property/BreadCrumbs";
import PropertyImage from "@/components/property/PropertyImage";
import PropertyDetails from "@/components/property/PropertyDetails";
import Amenities from "@/components/property/Amenities";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewsContainer from "@/components/review/ReviewsContainer";
import { Button } from "@/components/ui/button";
import { chillax } from "@/utils/fonts";

// Dynamic Components - Start
const DynamicMapLocation = dynamic(
  () => import("@/components/property/MapLocation"),
  {
    ssr: false,
    loading: () => (
      <>
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="my-4 w-1/4 h-6" />
        <Skeleton className="w-full h-96" />
      </>
    ),
  }
);

const DynamicBookingWrapper = dynamic(
  () => import("@/components/booking/BookingWrapper"),
  {
    ssr: false,
    loading: () => (
      <>
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="mt-4 w-full h-48" />
      </>
    ),
  }
);

const DynamicBookingCalendar = dynamic(
  () => import("@/components/booking/BookingCalendar"),
  {
    ssr: false,
    loading: () => (
      <>
        <Skeleton className="w-20 h-8" />
        <Skeleton className="mt-2 w-30 h-6" />
        <Skeleton className="mt-4 w-full h-60" />
      </>
    ),
  }
);
// Dynamic Components - End

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const propertyDetails = await fetchPropertyDetails({ propertyID: params.id });

  const {
    id,
    name,
    tagline,
    price,
    propertyImage,
    category,
    description,
    country,
    guests,
    bedrooms,
    beds,
    baths,
    profile,
    bookings,
    amenities,
  } = propertyDetails;

  const propertyInfo: PropertyDetailsProps = {
    id,
    name,
    category,
    description,
    guests,
    bedrooms,
    beds,
    baths,
    profile,
  };

  const countryDetails = getCountryByCode(country);

  return (
    <main>
      <BreadCrumbs propertyName={name} />

      {/* Heading - Tagline, Share and Favourite button */}
      <section className="mt-8 flex flex-wrap justify-between items-center gap-y-2">
        <h1
          className={`${chillax.className} capitalize tracking-wide font-semibold text-xl lg:text-3xl`}
        >
          {tagline}
        </h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={name} tagline={tagline} propertyID={params.id} />
          <Suspense
            fallback={
              <Button type="button" variant="outline" size="icon">
                <ReloadIcon className="animate-spin h-5 w-5" />
              </Button>
            }
          >
            <FavouriteButton propertyID={params.id} isPropertyPage={true} />
          </Suspense>
        </div>
      </section>

      {/* Property Image and Details */}
      <section className="mt-8 grid lg:grid-cols-[3fr_2fr] gap-y-8 gap-x-8 xl:gap-x-12">
        <PropertyImage propertyName={name} propertyImage={propertyImage} />
        <PropertyDetails {...propertyInfo} />
      </section>
      <Separator className="my-8" />

      {/* Amenities, Map Location and Booking Calendar */}
      <section className="relative grid lg:grid-cols-[3fr_2fr] gap-y-8 gap-x-8 xl:gap-x-12">
        <div>
          <Amenities amenities={amenities} />
          <Separator className="my-8" />
          <DynamicMapLocation countryDetails={countryDetails} />
          <Separator className="my-8" />
          <DynamicBookingCalendar
            price={price}
            propertyID={id}
            bookings={bookings}
          />
        </div>
        <div className="hidden lg:block relative">
          <div className="sticky top-8">
            <DynamicBookingWrapper
              price={price}
              propertyID={id}
              bookings={bookings}
            />
          </div>
        </div>
      </section>

      {/* Reviews Component - Input Reviews and See all reviews */}
      <section className="mt-16">
        <ReviewsContainer propertyID={params.id} profileID={profile.clerkID} />
      </section>
    </main>
  );
}
export default PropertyDetailsPage;
