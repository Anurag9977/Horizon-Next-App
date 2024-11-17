import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/properties(.*)"]);

const isCreateProfileRoute = createRouteMatcher(["/profile/create"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const userID = auth().userId;
  if (userID && !isCreateProfileRoute(req)) {
    const hasProfile = (await clerkClient().users.getUser(userID))
      .privateMetadata.hasProfile;
    if (!hasProfile) {
      return NextResponse.redirect(new URL("/profile/create", req.url));
    }
  }
  const isAdminUser = userID === process.env.ADMIN_USER_CLERK_ID;
  if (isAdminRoute(req) && !isAdminUser)
    return NextResponse.redirect(new URL("/", req.url));

  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
