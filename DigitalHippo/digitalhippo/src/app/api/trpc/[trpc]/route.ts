import {fetchRequestHandler} from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc";

const handler = (req: Request, res: Response) => {
  
/* Provided by trpc for handling backend re-route request, in this case */

  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // @ts-expect-error - context already passed from express middleware
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };