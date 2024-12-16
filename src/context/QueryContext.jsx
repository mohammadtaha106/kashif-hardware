import { QueryClient, QueryClientProvider } from "react-query";

export function QueryProvider({ children }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
