import { Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "Memlernado - Empower Your Homeschool Team",
  description:
    "Memlernado brings agile methodologies to homeschooling, helping kids self-organize and structure their learning journey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <>
          {children}
          <Toaster />
        </>
      </body>
    </html>
  );
}
