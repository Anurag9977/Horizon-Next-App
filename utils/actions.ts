"use server";

import db from "@/utils/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  profileImageSchema,
  profileSchema,
  propertyImageSchema,
  propertySchema,
  reviewSchema,
  updatePropertySchema,
  validateFieldsWithZod,
} from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { DateRange } from "react-day-picker";
import { getOrderTotals } from "./booking";
import { getNumberOfNights } from "./calendar";
import { getMonthYear } from "./format";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//HELPER FUNCTIONS - START

async function getAuthUser() {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
}

function getError(error: unknown): { message: string } {
  let errorMessage: string = "";
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      errorMessage = `${error.meta?.target} already exists.`;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "Something went wrong.";
  }
  return { message: errorMessage };
}

//HELPER FUNCTIONS - END

//PROFILE ACTIONS - START

export async function createProfile(
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateFieldsWithZod(profileSchema, rawData);
    await db.profile.create({
      data: {
        clerkID: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    await clerkClient().users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return getError(error);
  }
  redirect("/");
}

export async function getProfile() {
  const user = await getAuthUser();
  const userProfile = await db.profile.findUnique({
    where: {
      clerkID: user.id,
    },
  });
  if (!userProfile) redirect("/");
  return userProfile;
}

export async function getUserNameAndImage() {
  const user = await getAuthUser();
  const userNameAndImage = await db.profile.findUnique({
    where: {
      clerkID: user.id,
    },
    select: {
      profileImage: true,
      username: true,
    },
  });
  return userNameAndImage;
}

export async function updateProfile(
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateFieldsWithZod(profileSchema, rawData);
    const updatedProfile = await db.profile.update({
      where: {
        clerkID: user.id,
      },
      data: {
        ...validatedFields,
      },
    });
    if (!updatedProfile) redirect("/");
    revalidatePath("/profile");
    return { message: "Profile updated successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function updateProfileImage(
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const userName = (await getUserNameAndImage())?.username ?? user.id;
    const profileImage = formData.get("profileImage") as File;

    //Run through the zod validation
    const validatedImage = validateFieldsWithZod(profileImageSchema, {
      profileImage,
    });

    //Upload in Cloudinary
    const arrayBuffer = await validatedImage.profileImage.arrayBuffer();
    const bufferImage = new Uint8Array(arrayBuffer);
    const uploadedImage: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: userName,
            overwrite: true,
            folder: "Horizon-Next-App/Profile-Images",
          },
          (error, uploadResult) => {
            if (error) reject(error);
            return resolve(uploadResult);
          }
        )
        .end(bufferImage);
    });

    //Update user image using clerk id
    await db.profile.update({
      where: {
        clerkID: user.id,
      },
      data: {
        profileImage: uploadedImage?.secure_url,
      },
    });
    revalidatePath("/profile");
    return { message: "Profile image updated successfully." };
  } catch (error) {
    return getError(error);
  }
}

//PROFILE ACTIONS - END

//PROPERTIES ACTIONS - START

export async function createRental(
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);

    //Run through Zod Validation
    const validatedFields = validateFieldsWithZod(propertySchema, rawData);

    //Upload Image in Cloudinary
    const propertyImageFile = validatedFields.propertyImage;
    const arrayBuffer = await propertyImageFile.arrayBuffer();
    const bufferImage = new Uint8Array(arrayBuffer);
    const uploadedImage: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "Horizon-Next-App/Property-Images",
          },
          (error, uploadResult) => {
            if (error) reject(error);
            return resolve(uploadResult);
          }
        )
        .end(bufferImage);
    });

    //Add new rental into database
    await db.property.create({
      data: {
        ...validatedFields,
        propertyImage: uploadedImage?.secure_url,
        profileID: user.id,
      },
    });
  } catch (error) {
    return getError(error);
  }
  redirect("/");
}

export async function fetchUserRentals() {
  const user = await getAuthUser();
  const userRentals = await db.property.findMany({
    where: {
      profileID: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      bookings: {
        select: {
          totalNights: true,
          orderTotal: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const userRentalsWithTotals = await Promise.all(
    userRentals.map(async (rental) => {
      const totals = await db.booking.aggregate({
        _sum: {
          totalNights: true,
          orderTotal: true,
        },
        where: {
          propertyID: rental.id,
          paymentStatus: true,
        },
      });
      return {
        ...rental,
        totalNightsSum: totals._sum.totalNights ?? 0,
        orderTotalSum: totals._sum.orderTotal ?? 0,
      };
    })
  );

  return userRentalsWithTotals;
}

export async function updateRentalImage(
  { propertyID, imageURL }: { propertyID: string; imageURL: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const propertyImage = formData.get("propertyImage") as File;
    //Run through the zod validation
    const validatedImage = validateFieldsWithZod(propertyImageSchema, {
      propertyID,
      propertyImage,
    });
    //Get Exisiting File Name
    const existingImageFile = imageURL.split("/").pop();
    const existingFileName =
      existingImageFile?.split(".")[0] ?? validatedImage.propertyImage.name;

    //Upload in Cloudinary and replace existing image
    const arrayBuffer = await validatedImage.propertyImage.arrayBuffer();
    const bufferImage = new Uint8Array(arrayBuffer);
    const uploadedImage: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: existingFileName,
            overwrite: true,
            folder: "Horizon-Next-App/Property-Images",
          },
          (error, uploadResult) => {
            if (error) reject(error);
            return resolve(uploadResult);
          }
        )
        .end(bufferImage);
    });

    //Update user image using clerk id
    const updatedImage = await db.property.update({
      where: {
        id: propertyID,
        profileID: user.id,
      },
      data: {
        propertyImage: uploadedImage?.secure_url,
      },
    });
    if (!updatedImage) {
      return { message: "Property not found for this image." };
    }
    revalidatePath(`/rentals/${propertyID}/edit`);
    return { message: "Rental image updated successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function editRental(
  { propertyID }: { propertyID: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateFieldsWithZod(
      updatePropertySchema,
      rawData
    );

    const updatedRental = await db.property.update({
      where: {
        id: propertyID,
      },
      data: {
        ...validatedFields,
        profileID: user.id,
      },
    });
    if (!updatedRental) {
      return { message: "Property not found" };
    }
    revalidatePath(`/rentals/${propertyID}/edit`);
    return { message: "Rental changes updated successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function deleteRental(
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const propertyID = formData.get("propertyID") as string;
    const deletedProperty = await db.property.delete({
      where: {
        id: propertyID,
        profileID: user.id,
      },
    });
    if (!deletedProperty) {
      return {
        message: "Property already removed. Please wait or refresh the page.",
      };
    }
    revalidatePath("/rentals");
    return { message: "Property removed successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function fetchAllProperties({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) {
  return await db.property.findMany({
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
      propertyImage: true,
    },
    where: {
      category,
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tagline: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fetchPropertyDetails({
  propertyID,
}: {
  propertyID: string;
}) {
  const property = await db.property.findUnique({
    where: {
      id: propertyID,
    },
    include: {
      profile: {
        select: {
          clerkID: true,
          firstName: true,
          profileImage: true,
        },
      },
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });

  if (!property) {
    return redirect("/");
  }
  return property;
}

//PROPERTIES ACTIONS - END

//FAVOURITE ACTIONS - START

export async function fetchFavouriteID({
  propertyID,
}: {
  propertyID: string;
}): Promise<string | undefined> {
  const user = await getAuthUser();
  const favouriteID = await db.favourite.findFirst({
    where: {
      propertyID,
      profileID: user.id,
    },
    select: {
      id: true,
    },
  });
  return favouriteID?.id;
}

export async function toggleFavouriteProperty(
  {
    favouriteID,
    pathName,
  }: { favouriteID: string | undefined; pathName: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const propertyID = formData.get("propertyID") as string;
    if (!favouriteID) {
      await db.favourite.create({
        data: {
          propertyID,
          profileID: user.id,
        },
      });
    } else {
      await db.favourite.delete({
        where: {
          id: favouriteID,
        },
      });
    }
    revalidatePath(pathName);
    return {
      message: favouriteID
        ? "Property removed from favourites."
        : "Property added to favourites.",
    };
  } catch (error) {
    return getError(error);
  }
}

export async function fetchFavouriteProperties() {
  const user = await getAuthUser();
  const favourites = await db.favourite.findMany({
    where: {
      profileID: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          propertyImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favourites.map((favourite) => favourite.property);
}

//FAVOURITE ACTIONS - END

//REVIEWS ACTIONS - START

export async function createReview(
  { propertyID }: { propertyID: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateFieldsWithZod(reviewSchema, rawData);
    await db.review.create({
      data: {
        profileID: user.id,
        propertyID,
        ...validatedFields,
      },
    });
    revalidatePath(`/properties/${propertyID}`);
    return { message: "Review added successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function fetchPropertyReviews({
  propertyID,
}: {
  propertyID: string;
}) {
  return await db.review.findMany({
    where: {
      propertyID,
    },
    include: {
      profile: {
        select: {
          firstName: true,
          profileImage: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function fetchUserReviews() {
  const user = await getAuthUser();
  return await db.review.findMany({
    where: {
      profileID: user.id,
    },
    include: {
      property: {
        select: {
          name: true,
          country: true,
          propertyImage: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function fetchReviewID({ propertyID }: { propertyID: string }) {
  const user = await getAuthUser();
  const reviewID = await db.review.findFirst({
    where: {
      propertyID,
      profileID: user.id,
    },
    select: {
      id: true,
    },
  });
  return reviewID?.id;
}

export async function fetchReviewStats({ propertyID }: { propertyID: string }) {
  const reviewStats = await db.review.aggregate({
    _avg: {
      rating: true,
    },
    _count: {
      id: true,
    },
    where: {
      propertyID,
    },
  });
  return {
    averageRating: reviewStats?._avg.rating?.toFixed(1) ?? 0,
    totalReviews: reviewStats?._count.id ?? 0,
  };
}

export async function deleteReview(
  { pathName }: { pathName: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const reviewID = formData.get("reviewID") as string;
    const deletedReview = await db.review.delete({
      where: {
        id: reviewID,
        profileID: user.id,
      },
    });

    if (!deletedReview)
      return {
        message: "Review already deleted. Please wait or refresh the page.",
      };

    revalidatePath(pathName);
    return { message: "Review deleted successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function editReview(
  { pathName, reviewID }: { pathName: string; reviewID: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateFieldsWithZod(reviewSchema, rawData);
    await db.review.update({
      where: {
        id: reviewID,
        profileID: user.id,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(pathName);
    return { message: "Review updated successfully." };
  } catch (error) {
    return getError(error);
  }
}

//REVIEW ACTIONS - END

//BOOKING ACTIONS - START

export async function createBooking(
  { bookingRange }: { bookingRange: DateRange },
  formData: FormData
): Promise<{ message: string }> {
  const propertyID = formData.get("propertyID") as string;
  let bookingID: string = "";
  try {
    const user = await getAuthUser();
    if (!bookingRange || !bookingRange.from || !bookingRange.to)
      throw new Error("Invalid booking dates selected.");
    //Calculate number of nights
    const numberOfNights = getNumberOfNights(bookingRange) as number;

    //Fetch property price
    const property = await db.property.findUnique({
      where: {
        id: propertyID,
      },
      select: {
        price: true,
      },
    });
    if (!property) throw new Error("Property not found.");
    const { orderTotal } = getOrderTotals({
      price: property.price,
      numberOfNights,
    });
    //Delete all existing bookings which are booked by this user where the payment got failed.
    await db.booking.deleteMany({
      where: {
        profileID: user.id,
        paymentStatus: false,
      },
    });
    //Create new booking.
    const newBooking = await db.booking.create({
      data: {
        profileID: user.id,
        propertyID,
        checkIn: bookingRange.from,
        checkOut: bookingRange.to,
        totalNights: numberOfNights,
        orderTotal,
      },
    });
    bookingID = newBooking.id;
  } catch (error) {
    return getError(error);
  }
  return redirect(`/checkout?bookingID=${bookingID}`);
}

export async function fetchUserBookings() {
  const user = await getAuthUser();
  return db.booking.findMany({
    where: {
      profileID: user.id,
      paymentStatus: true,
    },
    select: {
      id: true,
      totalNights: true,
      orderTotal: true,
      checkIn: true,
      checkOut: true,
      createdAt: true,
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fetchReservationsOnUserRentals() {
  const user = await getAuthUser();
  return await db.booking.findMany({
    where: {
      property: {
        profileID: user.id,
      },
      paymentStatus: true,
    },
    select: {
      id: true,
      profile: {
        select: {
          firstName: true,
        },
      },
      totalNights: true,
      orderTotal: true,
      checkIn: true,
      checkOut: true,
      createdAt: true,
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fetchReservationStats() {
  const user = await getAuthUser();
  const rentalsCount = db.property.count({
    where: {
      profileID: user.id,
    },
  });
  const bookingTotalsSum = db.booking.aggregate({
    _sum: {
      totalNights: true,
      orderTotal: true,
    },
    where: {
      property: {
        profileID: user.id,
      },
    },
  });
  const [totalRentals, totalBookings] = await Promise.all([
    rentalsCount,
    bookingTotalsSum,
  ]);
  return {
    totalRentals,
    totalNights: totalBookings._sum.totalNights ?? 0,
    totalEarnings: totalBookings._sum.orderTotal ?? 0,
  };
}

export async function deleteBooking(
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const bookingID = formData.get("bookingID") as string;
    const deletedBooking = await db.booking.delete({
      where: {
        id: bookingID,
        profileID: user.id,
      },
    });
    if (!deletedBooking) {
      return { message: "Booking already deleted." };
    }
    revalidatePath("/bookings");
    return { message: "Booking deleted successfully." };
  } catch (error) {
    return getError(error);
  }
}

//BOOKING ACTIONS - END

//ADMIN ACTIONS - START

export async function fetchAdminStats() {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_CLERK_ID) return redirect("/");

  const userCount = db.profile.count();
  const propertyCount = db.property.count();
  const bookingCount = db.booking.count({
    where: {
      paymentStatus: true,
    },
  });
  const [totalUsers, totalProperties, totalBookings] = await Promise.all([
    userCount,
    propertyCount,
    bookingCount,
  ]);
  return { totalUsers, totalProperties, totalBookings };
}

export async function fetchBookingChartData() {
  let chartData: { month: string; bookings: number }[] = [];
  try {
    const user = await getAuthUser();
    if (user.id !== process.env.ADMIN_USER_CLERK_ID) return redirect("/");
    //Get last six months date
    let lastSixMonthsDate = new Date();
    lastSixMonthsDate.setDate(1);
    lastSixMonthsDate.setMonth(lastSixMonthsDate.getMonth() - 5);
    //Get last six months chart data
    const result = await db.booking.groupBy({
      by: "createdAt",
      where: {
        paymentStatus: true,
        createdAt: {
          gte: lastSixMonthsDate,
        },
      },
      _count: {
        _all: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    //Get the required data for the last six months
    result.forEach((data) => {
      const monthYear = getMonthYear(data.createdAt);
      let findMonth = chartData.find((item) => item.month === monthYear);
      if (findMonth) {
        findMonth.bookings += data._count._all;
      } else {
        chartData.push({
          month: monthYear,
          bookings: data._count._all,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
  return chartData;
}

//ADMIN ACTIONS - END
