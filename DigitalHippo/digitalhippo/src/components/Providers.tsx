"use client"

import { PropsWithChildren, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "@/trpc/client"
import { httpBatchLink } from "@trpc/client"

const Providers = ({ children }: PropsWithChildren) => {  /* Pass children together with properties */
  const [queryClient] = useState( () => new QueryClient());

  const [trpcClient] = useState( () => trpc.createClient({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",  /* Include credentials in pass between clientside over to serverside */
          })
        },
      }),
    ],
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>  {/* Use the tanstack typesafe wrapper for our trpc */}
    </trpc.Provider>
  )

}

export default Providers