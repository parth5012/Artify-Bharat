import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#8B4513" />
                <meta name="description" content="Artify Bharat - AI-Powered Verified Handmade Marketplace for Indian Artisans" />

                {/* Favicon - Company Logo */}
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="shortcut icon" href="/favicon.ico" />

                {/* Apple Touch Icons */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.png" />

                {/* Android Chrome Icons */}
                <link rel="icon" type="image/png" sizes="192x192" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/apple-touch-icon.png" />

                {/* Web App Manifest */}
                <link rel="manifest" href="/site.webmanifest" />

                {/* Microsoft Tiles */}
                <meta name="msapplication-TileColor" content="#8B4513" />
                <meta name="msapplication-TileImage" content="/apple-touch-icon.png" />
                <meta name="msapplication-config" content="/browserconfig.xml" />

                {/* Preconnect to Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

                {/* Aesthetic Fonts for Indian Artisan Theme */}
                <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Caveat:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Pacifico&family=Comfortaa:wght@300;400;500;600;700&family=Nunito:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}