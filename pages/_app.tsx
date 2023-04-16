import "globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as WagmiProvider } from "wagmi";

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider autoConnect>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiProvider>
  );
}

export default App;
