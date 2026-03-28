import "./globals.css";

export const metadata = {
  title: "Mets Recap Feed",
  description: "ESPN-style Mets game recaps"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
