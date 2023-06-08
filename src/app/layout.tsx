import "./globals.css";
import DAppProvider from "@/lib/providers/Dapp";

import { plex_mono } from "./fonts";

export const metadata = {
  title: "BOSSLESS",
  description: "DAO without BOSS",
  themeColor: "#1d4ed8",
  // themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <DAppProvider>
          <div className={plex_mono.className}>{children}</div>
        </DAppProvider>
      </body>
    </html>
  );
}
