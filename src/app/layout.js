import "./globals.css";
import Providers from "./providers";
import Layout from "@/components/home/Layout";
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "TwETH",
  description: "Real time encrypted streaming, a web 3 twitch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={`antialiased`}>
          <Layout>
            {children}
            <Toaster />
          </Layout>
        </body>
      </Providers>
    </html>
  );
}
