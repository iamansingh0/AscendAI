import { Inter } from "next/font/google";
// import { Alice } from "next/font/google"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] , display:"swap", adjustFontFallback: false});
// const alice = Alice({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata = {
  title: "AscendAI | AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
        baseTheme: dark
    }}>
      <html lang="en" suppressHydrationWarning className={inter.className}>
        <head>
          <link rel="icon" href="/mini.png" sizes="any" />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with NextJs</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}