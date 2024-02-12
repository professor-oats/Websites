import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "./index.ts";

export const trpc = createTRPCReact<AppRouter>({});