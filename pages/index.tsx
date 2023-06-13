import Head from 'next/head';
import BodyData from '../components/BodyData';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div >
      <Head>
        <title>vrillar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />

        <BodyData />

        <Footer />
      </main>

    </div>
  )
}
