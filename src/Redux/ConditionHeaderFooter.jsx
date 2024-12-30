"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";

const ConditionHeaderFooter = ({ children }) => {
  const pathname = usePathname();

  // Define routes where layout content should be excluded
  const excludedRoutes = ["/user/login", "/user/register"];

  // Check if the current route matches the excluded routes
  const isExcludedRoute = excludedRoutes.includes(pathname);

  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      {!isExcludedRoute && <Header />}

      {children}
      {!isExcludedRoute && (
        <footer className="mt-2 footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {currentYear || "----"} - All rights reserved by ACME
              Industries Ltd
            </p>
          </aside>
        </footer>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(ConditionHeaderFooter), {
  ssr: false,
});
