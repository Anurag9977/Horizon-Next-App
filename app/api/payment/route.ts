import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/utils/db";
import { getOrderTotals } from "@/utils/booking";
import { formatDate } from "@/utils/format";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const headers = req.headers;
  const origin = headers.get("origin");
  const { bookingID } = await req.json();

  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  try {
    const booking = await db.booking.findUnique({
      where: {
        id: bookingID,
        profileID: user.id,
      },
      select: {
        totalNights: true,
        checkIn: true,
        checkOut: true,
        property: {
          select: {
            name: true,
            price: true,
            propertyImage: true,
          },
        },
      },
    });

    if (!booking)
      return Response.json(null, {
        status: 404,
        statusText: "Booking not found.",
      });
    const bookingTotal = getOrderTotals({
      price: booking.property.price,
      numberOfNights: booking.totalNights,
    });

    const lineItems = [
      {
        quantity: 1,
        price_data: {
          currency: "inr",
          product_data: {
            name: booking.property.name,
            description: `${booking.totalNights} nights (${formatDate(
              booking.checkIn
            )} - ${formatDate(booking.checkOut)})`,
            images: [booking.property.propertyImage],
          },
          unit_amount: bookingTotal.orderTotal * 100,
        },
      },
    ];

    //Create checkout session from body params
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      metadata: { bookingID },
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: user.emailAddresses[0].emailAddress,
      billing_address_collection: "required",
      return_url: `${origin}/payment_return?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "internal server error",
    });
  }
}
