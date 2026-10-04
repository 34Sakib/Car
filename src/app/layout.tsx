import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "NOVA",
  description: "An interactive digital showroom for the new era of driving.",
  openGraph: {
    title: "NOVA",
    description: "An interactive digital showroom for the new era of driving.",
    images: ["/images/og-image.jpg"],
  },
};

import SmoothScroll from "@/components/transitions/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('nova-theme');
                  if (saved === 'dark' || (!saved && true)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}

                if (typeof window !== 'undefined') {
                  var origError = console.error;
                  console.error = function() {
                    for (var i = 0; i < arguments.length; i++) {
                      var arg = arguments[i];
                      var str = typeof arg === 'string' ? arg : (arg && arg.message ? arg.message : '');
                      if (
                        str.indexOf('bis_skin_checked') !== -1 ||
                        str.indexOf('bis_register') !== -1 ||
                        str.indexOf('__processed_') !== -1
                      ) {
                        return;
                      }
                    }
                    origError.apply(console, arguments);
                  };
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}