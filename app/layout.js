import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'FutureSaaS - Next Generation SaaS Platform',
  description: 'A futuristic SaaS platform showcasing cutting-edge features and modern design',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}