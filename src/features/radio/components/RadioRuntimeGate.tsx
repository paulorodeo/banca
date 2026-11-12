import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { RadioProvider } from "./RadioProvider";

const MiniRadioPlayer = lazy(() =>
  import("./MiniRadioPlayer").then((module) => ({ default: module.MiniRadioPlayer })),
);

export function RadioRuntimeGate({ children }: { children: ReactNode }) {
  const isRadioRoute = useRouterState({
    select: (state) => state.location.pathname.replace(/\/+$/, "") === "/radio",
  });
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (window.scrollY > 350) {
      setActivated(true);
      return;
    }
    const onScroll = () => {
      if (window.scrollY > 350) {
        setActivated(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <RadioProvider>
      {children}
      {!isRadioRoute && activated ? (
        <Suspense fallback={null}>
          <MiniRadioPlayer />
        </Suspense>
      ) : null}
    </RadioProvider>
  );
}
