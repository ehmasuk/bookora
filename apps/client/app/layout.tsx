import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import AuthProvider from "@/providers/AuthProvider";
import EasyPeasyStoreProvider from "@/providers/EasyPeasyStoreProvider";
import StepProvider from "@/providers/StepProvider";
import { SWRProvider } from "@/providers/SWRProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "@workspace/ui/globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookOra",
  description: "Create your dream book",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          <SWRProvider>
            <EasyPeasyStoreProvider>
              <StepProvider>
                <NextIntlClientProvider messages={messages}>
                  <NextTopLoader color="#155dfb" />
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    {children}
                    <Toaster position="bottom-right" />
                  </ThemeProvider>
                </NextIntlClientProvider>
              </StepProvider>
            </EasyPeasyStoreProvider>
          </SWRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
