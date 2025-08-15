import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="lang-en">
      <Head>
        {/* 禁用 JS 的环境下，隐藏 SSR 输出的全屏 loader，确保抓取器能看到内容与 meta */}
        <noscript>
          <style>{`#app-loader{display:none !important;}`}</style>
        </noscript>
      </Head>
      <body className="antialiased dark text-foreground bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
