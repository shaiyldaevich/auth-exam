import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import RootLayoutClient from './layout.client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<RootLayoutClient>{children}</RootLayoutClient>
			</body>
		</html>
	);
}
