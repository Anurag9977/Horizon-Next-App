"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingID = searchParams.get("bookingID");
  if (!bookingID) {
    return router.push("/");
  }

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      bookingID,
    });
    const data = response.data;
    return data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
export default CheckoutPage;
