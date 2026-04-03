import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The People's Party — Not Left. Not Right. Forward.",
  description: "A People-First political movement to break the two-party stranglehold, eliminate government waste, and restore government for the people, by the people.",
  openGraph: {
    title: "The People's Party",
    description: "Not Left. Not Right. Forward.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
