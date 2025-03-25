import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';

interface QueryClientProviderProps {
  children: React.ReactNode;
  client?: QueryClient;
}

export function QueryClientProvider({
  children,
  client,
}: QueryClientProviderProps) {
  const [queryClient] = useState(() => client || new QueryClient());
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
