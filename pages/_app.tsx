import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/global.css";
import type { AppProps } from "next/app";

import Layout from "../components/Layout";
import { CartProvider } from "../custom-hooks/use-cart";
import { ModalProvider } from "../custom-hooks/use-modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3600000,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
