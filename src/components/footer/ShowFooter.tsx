"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ShowFooterProps {
  children: React.ReactNode;
  restrictedPaths: string[];
}

const ShowFooter: React.FC<ShowFooterProps> = ({
  children,
  restrictedPaths,
}) => {
  const pathname = usePathname() ?? "";
  const [showFooter, setShowFooter] = useState(
    !restrictedPaths.includes(pathname)
  );

  useEffect(() => {
    setShowFooter(!restrictedPaths.includes(pathname));
  }, [pathname, restrictedPaths]);

  return <>{showFooter ? children : null}</>;
};

export default ShowFooter;
