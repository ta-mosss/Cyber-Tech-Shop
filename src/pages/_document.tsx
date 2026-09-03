import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-dark text-gray-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
