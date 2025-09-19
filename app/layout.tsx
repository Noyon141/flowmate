import { ModeToggle } from "@/components/dark-mode/Mode-Toggle";
import { ThemeProvider } from "@/components/dark-mode/Theme-Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flowmate | AI Workspace for Remote Teams",
  description: "Flowmate | AI powered workflow automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
        elements: {
          rootBox: "w-full max-w-full",
          card: "bg-transparent shadow-none border-none p-0 w-full max-w-full",
          cardBox: "w-full max-w-full p-5",
          headerTitle:
            "text-slate-900 dark:text-slate-100 text-lg sm:text-xl font-semibold",
          headerSubtitle:
            "text-slate-600 dark:text-slate-400 text-sm sm:text-base",
          socialButtonsBlockButton:
            "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 w-full max-w-full text-sm",
          socialButtonsBlockButtonText:
            "text-slate-900 dark:text-slate-100 font-medium text-sm",
          formFieldInput:
            "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 w-full max-w-full text-sm",
          formFieldLabel:
            "text-slate-700 dark:text-slate-300 font-medium text-sm",
          formButtonPrimary:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium w-full max-w-full text-sm",
          footerActionLink:
            "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
          identityPreviewText: "text-slate-700 dark:text-slate-300",
          formFieldErrorText: "text-red-600 dark:text-red-400",
          dividerLine: "bg-slate-200 dark:bg-slate-600",
          dividerText: "text-slate-500 dark:text-slate-400",
          otpCodeFieldInput:
            "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${lato.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute={"class"}
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen relative">
              {/* Theme Toggle - Top Right */}
              <div className="absolute top-4 right-4 z-10">
                <ModeToggle />
              </div>
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
