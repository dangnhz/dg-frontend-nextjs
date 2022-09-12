import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en-AU">
      <Head>
            <link rel="manifest" crossOrigin="use-credentials" href="/manifest.json" />
            <link rel="icon" href="/favicon.ico?v=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="apple-touch-icon" href="/logo192.png?v=1" />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
{/* 
            <link rel="preload" as="font" href="/fonts/Gilroy-Bold.woff2" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" as="font" href="/fonts/Gilroy-Regular.woff2" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" as="font" href="/fonts/Gilroy-Medium.woff2" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" as="font" href="/fonts/Gilroy-Light.woff2" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" as="font" href="/fonts/CrimsonText-Regular.woff2" type="font/woff2" crossOrigin="anonymous" /> */}
           

      </Head>
      <body className="is-loading">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KR45ZC2" height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe></noscript>

        <Script strategy="lazyOnload" id="ga">
            {`
               (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-KR45ZC2');
            `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}