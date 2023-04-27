"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/constants";
import { useAccount } from "wagmi";

type Props = {
  children: ReactNode;
};

function AuthProvider({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isBrowser = () => typeof window !== "undefined";
  const isAuthenticated = useAccount().isConnected;

  let unprotectedRoutes = [routes.AUTH];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push(routes.AUTH);
  }

  if (isBrowser() && isAuthenticated && !pathIsProtected) {
    router.push(routes.HOME);
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthProvider;
