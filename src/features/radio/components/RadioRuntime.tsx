import type { ReactNode } from "react";
import { MiniRadioPlayer } from "./MiniRadioPlayer";
import { RadioProvider } from "./RadioProvider";

export default function RadioRuntime({ children }: { children: ReactNode }) {
  return (
    <RadioProvider>
      {children}
      <MiniRadioPlayer />
    </RadioProvider>
  );
}
