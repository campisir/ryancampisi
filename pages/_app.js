import '../src/App.css';
import '../src/Components/MoreAboutMe.css';
import '../src/Components/MyChess.css';
import '../src/Components/Philosophy.css';
import '../src/Components/Portfolio.css';
import '../src/Components/Resume.css';
import '../src/Components/Travel.css';
import '../src/Components/Trophies.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HN847L26DC"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HN847L26DC');
        `}
      </Script>
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
