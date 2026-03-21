import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://global-biz-hub.replit.app"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`dark ${syne.variable}`}
      style={{ fontFamily: "'Syne', var(--font-syne), system-ui, sans-serif" }}
      suppressHydrationWarning
    >
      <body>
        <style dangerouslySetInnerHTML={{ __html: `
          * { overflow: visible !important; }
          h1, h2, h3, h4, h5, h6 {
            line-height: 1.4 !important;
            padding-bottom: 0.2em !important;
          }
          p, a {
            line-height: 1.6 !important;
          }
        `}} />
        {children}
      </body>
    </html>
  );
}
