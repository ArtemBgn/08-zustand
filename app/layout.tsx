import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Note Hub',
  description:
    'NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.',
  openGraph: {
    title: 'Note Hub',
    description:
      'NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.',
    url: `https://notehub.com/notes`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
