"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ShowNavProps {
  children: React.ReactNode;
  restrictedPaths: string[];
}

const ShowNav: React.FC<ShowNavProps> = ({ children, restrictedPaths }) => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname() ?? "";

  useEffect(() => {
    setShowNav(!restrictedPaths.includes(pathname));
  }, [showNav, pathname, restrictedPaths]);

  return <>{showNav ? children : null}</>;
};

export default ShowNav;
