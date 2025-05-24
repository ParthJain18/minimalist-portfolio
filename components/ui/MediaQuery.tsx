"use client";

import { useEffect, useState } from "react";

type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
};

const defaultBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type Props = {
  children: (matches: {
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2xl: boolean;
  }) => React.ReactNode;
  breakpoints?: Partial<Breakpoints>;
};

export default function MediaQuery({ 
  children, 
  breakpoints: customBreakpoints = {}
}: Props) {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  
  const [matches, setMatches] = useState({
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkBreakpoints = () => {
      const width = window.innerWidth;
      setMatches({
        isSm: width >= breakpoints.sm,
        isMd: width >= breakpoints.md,
        isLg: width >= breakpoints.lg,
        isXl: width >= breakpoints.xl,
        is2xl: width >= breakpoints["2xl"],
      });
    };

    // Initial check
    checkBreakpoints();

    // Add event listener
    window.addEventListener("resize", checkBreakpoints);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkBreakpoints);
    };
  }, [
    breakpoints.sm,
    breakpoints.md,
    breakpoints.lg,
    breakpoints.xl,
    breakpoints["2xl"],
  ]);

  return children(matches);
}