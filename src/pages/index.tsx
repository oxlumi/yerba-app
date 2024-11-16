import Head from 'next/head';
import { Landing } from '~/containers';

const Home = () => {
  return (
    <>
      <Head>
        <title>Yerba Coffee</title>
      </Head>
      <Landing />
    </>
  );
};

export default Home;
