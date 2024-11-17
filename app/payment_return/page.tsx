"use client";

import { redirect, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

function PaymentReturnPage() {
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(
    undefined
  );
  const searchParams = useSearchParams();
  const sessionID = searchParams.get("session_id");
  //No Session ID provided
  if (!sessionID) return redirect("/");

  useEffect(() => {
    async function getPaymentStatus() {
      const paymentResponse = await axios.get(
        `/api/paymentStatus?session_id=${sessionID}`
      );
      const data = paymentResponse.data;
      setPaymentStatus(data.status);
    }
    getPaymentStatus();
  }, []);

  //Payment Status Loading...
  if (paymentStatus === undefined) {
    return (
      <div>
        <h1 className="text-lg font-semibold tracking-wide">
          Please wait while we confirm your payment...
        </h1>
        <p className="text-base">
          Do NOT refresh or press back button or close the window.
        </p>
      </div>
    );
  }

  //Payment OPEN
  if (paymentStatus === "open") return redirect("/");

  //Payment DONE
  if (paymentStatus === "complete") return redirect("/bookings");

  //Payment FAILED
  return null;
}
export default PaymentReturnPage;
