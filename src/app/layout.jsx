import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionHeaderFooter from "@/Redux/ConditionHeaderFooter";

// import { usePathname } from "next/navigation";
// import Header from "@/components/Header/Header";

import ReduxProvider from "@/Redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ConditionHeaderFooter>
            {/* Conditionally render layout content */}
            {/* {!isExcludedRoute && <header />} */}

            {/* <Header /> */}
            {children}

            {/* {!isExcludedRoute && (
              <footer className="mt-2 footer footer-center bg-base-300 text-base-content p-4">
                <aside>
                  <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by ACME Industries Ltd
                  </p>
                </aside>
              </footer>
            )} */}

            {/* <footer className="mt-2 footer footer-center bg-base-300 text-base-content p-4">
            <aside>
              <p>
                Copyright © {new Date().getFullYear()} - All right reserved by
                ACME Industries Ltd
              </p>
            </aside>
          </footer> */}
          </ConditionHeaderFooter>
        </ReduxProvider>
      </body>
    </html>
  );
}