import { createServerFn } from "@tanstack/react-start";
import { runtimePublicOrigin } from "./public-url";
export const readPublicOrigin = createServerFn({ method: "GET" }).handler(() =>
  runtimePublicOrigin(process.env),
);
