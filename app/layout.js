import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: "%s - Racik CV",
    absolute: "Meracik CV kamu dengan AI terkini",
  },
  description: "Meracik CV kamu dengan AI terkini untuk membuat profesional Resume yang akan membantumu mengemukan pekerjaan",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
