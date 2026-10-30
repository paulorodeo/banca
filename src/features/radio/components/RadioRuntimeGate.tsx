import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

const RadioRuntime = lazy(() => import("./RadioRuntime"));

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

  if (!isRadioRoute && !activated) return children;

  return (
    <Suspense fallback={null}>
      <RadioRuntime>{children}</RadioRuntime>
    </Suspense>
  );
}
