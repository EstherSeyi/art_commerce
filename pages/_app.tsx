import "../styles/global.css";
import type { AppProps } from "next/app";

import Layout from "../components/Layout";
import { CartProvider } from "../custom-hooks/use-cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
