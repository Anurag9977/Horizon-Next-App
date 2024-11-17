import Stripe from "stripe";
import { NextRequest } from "next/server";
import db from "@/utils/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionID = searchParams.get("session_id") as string;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID);
    const bookingID = session.metadata?.bookingID;
    if (session.status === "complete") {
      await db.booking.update({
        where: {
          id: bookingID,
        },
        data: {
          paymentStatus: true,
        },
      });
    }
    return Response.json({
      status: session.status,
    });
  } catch (error) {
    return Response.json(null, {
      status: 500,
      statusText: "internal server error",
    });
  }
}
