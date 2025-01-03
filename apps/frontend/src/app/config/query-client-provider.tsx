import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

export function QueryClientProvider({ children }: React.PropsWithChildren<{}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
