import BaiDuAnalytics from "@/app/BaiDuAnalytics";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import { NextAuthProvider } from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { UserInfo } from "@/types/user";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});



export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const user = (await getCurrentUser()) as UserInfo;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextAuthProvider>
              <Header user={user} />
              <div className="flex max-full mx-auto flex-col justify-center py-0 min-h-screen">
                <main className="flex-1 mt-20 flex justify-center">
                  {children}
                </main>
                <Footer />
              </div>
            </NextAuthProvider>
            <Analytics />
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
          {process.env.NODE_ENV === "development" ? (
            <></>
          ) : (
            <>
              <GoogleAnalytics />
              <BaiDuAnalytics />
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
