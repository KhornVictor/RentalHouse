"use client";

import { usePathname } from "next/navigation";

// Define all routes in a centralized object for easy management
export const routes = {
  home: {
    path: "/",
    name: "Home",
    description: "Landing page with features and pricing",
  },
  login: {
    path: "/page/login",
    name: "Login",
    description: "User login page",
  },
  signup: {
    path: "/page/signup",
    name: "Sign Up",
    description: "User registration page",
  },
  homeDashboard: {
    path: "/page/home",
    name: "Dashboard",
    description: "User dashboard after login",
  },
} as const;

export type RouteKey = keyof typeof routes;

export const useActiveRoute = () => {
  const pathname = usePathname();

  const activeRoute = Object.entries(routes).find(
    ([_, route]) => route.path === pathname,
  );

  return {
    pathname,
    currentRoute: activeRoute ? (activeRoute[0] as RouteKey) : null,
    isHome: pathname === routes.home.path,
    isLogin: pathname === routes.login.path,
    isSignup: pathname === routes.signup.path,
    isDashboard: pathname === routes.homeDashboard.path,
  };
};

// Utility function to check if a route is active
export const isRouteActive = (
  routePath: string,
  currentPath: string,
): boolean => {
  return currentPath === routePath;
};

// Function to get navigation links for the navbar
export const getNavigationLinks = () => {
  return Object.values(routes).map((route) => ({
    href: route.path,
    label: route.name,
    description: route.description,
  }));
};
