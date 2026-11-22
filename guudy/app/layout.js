import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';

const display = Fredoka({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--display' });
const body = Nunito({ subsets: ['latin'], variable: '--body' });

export const metadata = { title: 'Guudy', description: 'Check suspicious media and learn to spot scams' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <main className="shell">{children}</main>
      </body>
    </html>
  );
}
