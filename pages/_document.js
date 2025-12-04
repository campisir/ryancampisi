import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Fonts */}
        <link rel="stylesheet" type="text/css" href="/css/default.css" />
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        <link rel="stylesheet" type="text/css" href="/css/media-queries.css" />
        <link rel="stylesheet" type="text/css" href="/css/magnific-popup.css" />
        
        {/* jQuery and plugins */}
        <script src="/js/jquery-1.10.2.min.js"></script>
        <script src="/js/jquery-migrate-1.2.1.min.js"></script>
        <script src="/js/modernizr.js"></script>
        <script src="/js/jquery.fittext.js"></script>
        <script src="/js/waypoints.js"></script>
        <script src="/js/jquery.flexslider.js"></script>
        <script src="/js/magnific-popup.js"></script>
        <script src="/js/init.js"></script>
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ryan Campisi",
              "jobTitle": "Software Engineer",
              "url": "https://www.ryancampisi.com",
              "sameAs": [
                "https://www.linkedin.com/in/ryan-campisi",
                "https://github.com/campisir"
              ],
              "knowsAbout": ["Software Development", "Full Stack Development", "JavaScript", "React", "Python"]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
