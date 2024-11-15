'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import 'drjflex/primeflex.css';
import 'drjicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <LayoutProvider>{children}</LayoutProvider>
            </body>
        </html>
    );
}
