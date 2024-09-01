import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SquidContextProvider } from "@squidcloud/react";
import { EnvironmentId, SquidRegion } from "@squidcloud/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SquidContextProvider
      options={{
        appId: process.env.NEXT_PUBLIC_SQUID_APP_ID as string,
        region: process.env.NEXT_PUBLIC_SQUID_REGION as SquidRegion,
        environmentId: process.env
          .NEXT_PUBLIC_SQUID_ENVIRONMENT_ID as EnvironmentId,
        squidDeveloperId: process.env.NEXT_PUBLIC_SQUID_DEVELOPER_ID,
      }}
    >
      <Component {...pageProps} />
    </SquidContextProvider>
  );
}
