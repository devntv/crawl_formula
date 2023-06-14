import dynamic from 'next/dynamic';
import Head from 'next/head';
// import BodyData from '../components/BodyData';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import styles from '../styles/Home.module.css';
const Header = dynamic(() => import("../components/Header"), { ssr: false });
const BodyData = dynamic(() => import("../components/BodyData"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

export default function Home() {
  return (
    <div >
      <Head>
        <title>vrillar</title>
        <link rel="icon" href="/images/vrlogo.png" />
      </Head>
      <main>
        <Header />
        <BodyData />
        <Footer />
      </main>

    </div>
  )
}
