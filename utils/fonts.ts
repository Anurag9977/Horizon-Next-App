import localFont from "next/font/local";

export const chillax = localFont({
  src: [
    {
      path: "../assets/fonts/Chillax-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../assets/fonts/Chillax-Semibold.woff2",
      style: "normal",
      weight: "600",
    },
  ],
});

export const switzer = localFont({
  src: [
    {
      path: "../assets/fonts/Switzer-Regular.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../assets/fonts/Switzer-Semibold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../assets/fonts/Switzer-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
});
