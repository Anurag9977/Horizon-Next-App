export type formAction = (formData: FormData) => Promise<{ message: string }>;

export type PropertyCardType = {
  id: string;
  name: string;
  tagline: string;
  propertyImage: string;
  price: number;
  country: string;
};

export type UserDetailsProps = {
  firstName: string;
  profileImage: string;
};

export type PropertyDetailsProps = {
  id: string;
  name: string;
  category: string;
  description: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  profile: UserDetailsProps;
};

export type ReviewCardType = {
  type: "user" | "property";
  id: string;
  rating: number;
  comment: string;
  clerkID: string;
  title: string;
  subTitle: string;
  href?: string;
  image: string;
  updatedAt: Date;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};

export type OrderTotalType = {
  subTotal: number;
  tax: number;
  convenienceFee: number;
  orderTotal: number;
};

export type BookingItem = {
  id: string;
  totalNights: number;
  orderTotal: number;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  property: {
    id: string;
    name: string;
    country: string;
  };
};

export type RentalItem = {
  id: string;
  name: string;
  price: number;
  totalNightsSum: number;
  orderTotalSum: number;
};

export type ReservationItem = {
  id: string;
  profile: {
    firstName: string;
  };
  totalNights: number;
  orderTotal: number;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  property: {
    id: string;
    name: string;
    country: string;
  };
};
