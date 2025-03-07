"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ShowNavProps {
  children: React.ReactNode;
  restrictedPaths: string[];
}

const ShowNav: React.FC<ShowNavProps> = ({ children, restrictedPaths }) => {
  const pathname = usePathname() ?? "";
  const [showNav, setShowNav] = useState(!restrictedPaths.includes(pathname));

  useEffect(() => {
    setShowNav(!restrictedPaths.includes(pathname));
  }, [pathname, restrictedPaths]);

  return <>{showNav ? children : null}</>;
};

export default ShowNav;