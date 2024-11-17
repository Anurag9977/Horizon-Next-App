import { z, ZodSchema } from "zod";

//Profile Schema
export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be atleast 2 characters.",
    })
    .max(20, {
      message: "First name should not be more than 20 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be atleast 2 characters.",
    })
    .max(20, {
      message: "Last name should not be more than 20 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "User name must be atleast 2 characters.",
    })
    .max(10, {
      message: "User name should not be more than 10 characters.",
    }),
});
export type ProfileType = z.infer<typeof profileSchema>;

//Profile Image Schema
export const profileImageSchema = z.object({
  profileImage: z
    .instanceof(File, { message: "Please upload an image file." })
    .refine(
      (imageFile) => {
        const allowedFileTypes = ["image/"];
        return allowedFileTypes.some((type) => imageFile.type.startsWith(type));
      },
      {
        message: "Please upload an image file.",
      }
    )
    .refine(
      (imageFile) => {
        const allowedSize = 1024 * 1024;
        return imageFile.size <= allowedSize;
      },
      { message: "Image should not be greater 1 MB." }
    ),
});
export type ProfileImageType = z.infer<typeof profileImageSchema>;

//Property Schema
export const propertySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should have atleast 2 characters." })
    .max(50, {
      message: "Name should not be more than 50 characters.",
    }),
  tagline: z
    .string()
    .min(5, { message: "Tagline should have atleast 5 characters." })
    .max(100, {
      message: "Tagline should not be more than 100 characters.",
    }),
  category: z.string(),
  country: z.string(),
  description: z.string().refine(
    (desc) => {
      const wordCount = desc.split(" ").length;
      return wordCount > 10 && wordCount < 1000;
    },
    { message: "Description should contain between 10 to 1000 words." }
  ),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be greater than 0." }),
  guests: z.coerce
    .number()
    .int()
    .min(1, { message: "Guests must be greater than 0." })
    .max(20, { message: "Guests should not exceed 20." }),
  bedrooms: z.coerce
    .number()
    .int()
    .min(1, { message: "Bedrooms must be greater than 0." })
    .max(20, { message: "Bedrooms should not exceed 20." }),
  beds: z.coerce
    .number()
    .int()
    .min(1, { message: "Beds must be greater than 0." })
    .max(20, { message: "Beds should not exceed 20." }),
  baths: z.coerce
    .number()
    .int()
    .min(1, { message: "Baths must be greater than 0." })
    .max(20, { message: "Baths should not exceed 20." }),
  amenities: z.string().refine((value) => value !== "[]" && value !== "", {
    message: "Please select atleast one amenity.",
  }),
  propertyImage: getPropertyImageSchemaType(),
});
export type PropertyType = z.infer<typeof propertySchema>;

//Property Image Scehma
export const propertyImageSchema = z.object({
  propertyImage: getPropertyImageSchemaType(),
});

//Update Property Schema
export const updatePropertySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should have atleast 2 characters." })
    .max(50, {
      message: "Name should not be more than 50 characters.",
    }),
  tagline: z
    .string()
    .min(5, { message: "Tagline should have atleast 5 characters." })
    .max(100, {
      message: "Tagline should not be more than 100 characters.",
    }),
  category: z.string(),
  country: z.string(),
  description: z.string().refine(
    (desc) => {
      const wordCount = desc.split(" ").length;
      return wordCount > 10 && wordCount < 1000;
    },
    { message: "Description should contain between 10 to 1000 words." }
  ),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be greater than 0." }),
  guests: z.coerce
    .number()
    .int()
    .min(1, { message: "Guests must be greater than 0." })
    .max(20, { message: "Guests should not exceed 20." }),
  bedrooms: z.coerce
    .number()
    .int()
    .min(1, { message: "Bedrooms must be greater than 0." })
    .max(20, { message: "Bedrooms should not exceed 20." }),
  beds: z.coerce
    .number()
    .int()
    .min(1, { message: "Beds must be greater than 0." })
    .max(20, { message: "Beds should not exceed 20." }),
  baths: z.coerce
    .number()
    .int()
    .min(1, { message: "Baths must be greater than 0." })
    .max(20, { message: "Baths should not exceed 20." }),
  amenities: z.string().refine((value) => value !== "[]" && value !== "", {
    message: "Please select atleast one amenity.",
  }),
});
export type UpdatePropertyType = z.infer<typeof updatePropertySchema>;

//Delete Property Schema
export const deletePropertySchema = z.object({
  propertyID: z.string(),
});
export type DeletePropertyType = z.infer<typeof deletePropertySchema>;

//Get Property Image Schema Type
function getPropertyImageSchemaType() {
  return z
    .instanceof(File, { message: "Please upload an image file." })
    .refine(
      (imageFile) => {
        const allowedFileTypes = ["image/"];
        return allowedFileTypes.some((type) => imageFile.type.startsWith(type));
      },
      {
        message: "Please upload an image file.",
      }
    )
    .refine(
      (imageFile) => {
        const allowedSize = 3 * 1024 * 1024;
        return imageFile.size <= allowedSize;
      },
      { message: "Image should not be greater 3 MB." }
    );
}

//Favourite Form Schema
export const favouriteSchema = z.object({
  propertyID: z.string(),
});
export type FavouriteType = z.infer<typeof favouriteSchema>;

//Review Schema
export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Please select a rating between 1 to 5." })
    .max(5, { message: "Please select a rating between 1 to 5." }),
  comment: z.string().refine(
    (value) => {
      const wordCount = value.split(" ").length;
      return wordCount > 0 && wordCount < 50;
    },
    { message: "Feedback should contain between 1 to 50 words." }
  ),
});
export type ReviewType = z.infer<typeof reviewSchema>;

//Delete Review Schema
export const deleteReviewSchema = z.object({
  reviewID: z.string(),
});
export type DeleteReviewType = z.infer<typeof deleteReviewSchema>;

//Create Booking Schema
export const createBookingSchema = z.object({
  propertyID: z.string(),
});
export type CreateBookingType = z.infer<typeof createBookingSchema>;

//Delete Booking Schema
export const deleteBookingSchema = z.object({
  bookingID: z.string(),
});
export type DeleteBookingType = z.infer<typeof deleteBookingSchema>;

//ZOD Validation
export function validateFieldsWithZod<T>(
  schema: ZodSchema<T>,
  values: unknown
) {
  const validatedFields = schema.safeParse(values);
  if (!validatedFields.success) {
    let errors = validatedFields.error.errors
      .map((error) => error.message)
      .join("\n");
    if (!errors) {
      errors = validatedFields.error.message;
    }
    throw new Error(errors);
  }
  return validatedFields.data;
}
