import { ReactElement } from "react";
import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "A Todo App built with Next.js in TypeScript and Taiwind CSS for training purposes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) : ReactElement {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        {children}
      </body>
    </html>
  );
}