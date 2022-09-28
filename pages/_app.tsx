import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { UIProvider } from "context/UIContext";
import AppLayout from "@components/common/AppLayout";
import SearchProvider from "context/SearchContext";
import { refreshToken } from "@lib/api/login.service";
import { useRouter } from "next/router";
import * as gtag from "@lib/gtag";
// Import Swiper styles
import "swiper/css";

import "../styles/globals.scss";
import "@components/ui/Project/ProjectSlider/ProjectSlider.scss";
import Script from "next/script";

function MyApp({ Component, pageProps: p }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const pageProps: any = p;

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url:any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);


  useEffect(() => {
    document.body.classList?.remove("is-loading");
    refreshToken();
  }, []);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SearchProvider>
            <UIProvider>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </UIProvider>
          </SearchProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
