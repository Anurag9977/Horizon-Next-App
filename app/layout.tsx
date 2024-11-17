import type { Metadata } from "next";
import "./globals.css";
import MainContainer from "@/components/global/MainContainer";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { switzer } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Horizon | Vacation, cottage, villas & more",
  description: "Book your next vacation and go beyond the horizon.",
  keywords: "horizon, nextjs, shadcn, prisma, supabase, clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInForceRedirectUrl="/profile/create"
      signUpForceRedirectUrl="/profile/create"
    >
      <html lang="en" suppressHydrationWarning>
        <body className={switzer.className}>
          <Providers>
            <Navbar />
            <MainContainer className="py-16">{children}</MainContainer>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
