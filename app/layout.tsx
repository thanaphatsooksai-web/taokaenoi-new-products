import type { Metadata } from "next";
import { Prompt, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const display = Prompt({
  subsets: ["thai", "latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "เถ้าแก่น้อย NEW SIZE | เติมรส ให้ทุกมื้อ",
  description:
    "สินค้าใหม่ สาหร่ายอบ 20 กรัม และสาหร่ายโรยข้าว 45 กรัม รสดั้งเดิมและรสต้มยำ บางกรอบกว่าเดิม ลดโซเดียม",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
