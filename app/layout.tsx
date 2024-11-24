'use client';
import 'drjflex/primeflex.css';
import 'drjicons/primeicons.css';
import { LayoutProvider } from '../layout/context/layoutcontext';
import '../styles/demo/Demos.scss';
import '../styles/elements/elements.scss';
import '../styles/layout/layout.scss';
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/md-dark-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <LayoutProvider>{children}</LayoutProvider>
            </body>
        </html>
    );
}
