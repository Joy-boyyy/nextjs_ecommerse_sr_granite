"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

const ConditionHeaderFooter = ({ children }) => {
  const pathname = usePathname();

  // Define routes where layout content should be excluded
  const excludedRoutes = ["/user/login", "/user/register"];

  // Check if the current route matches the excluded routes
  const isExcludedRoute = excludedRoutes.includes(pathname);
  return (
    <>
      {!isExcludedRoute && <Header />}

      {children}
      {!isExcludedRoute && (
        <footer className="mt-2 footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              ACME Industries Ltd
            </p>
          </aside>
        </footer>
      )}
    </>
  );
};

export default ConditionHeaderFooter;
