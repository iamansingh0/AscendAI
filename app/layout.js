import { Inter } from "next/font/google";
// import { Alice } from "next/font/google"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

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

            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}