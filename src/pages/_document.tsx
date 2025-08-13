import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="lang-en">
      <Head />
      <body className="antialiased dark text-foreground bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
