import Head from 'next/head'
import Navbar from '../components/NavBar'
import { table, minifyRecord } from './api/utils/Airtable';

export default function Home({initialToDos}) {
  console.log(initialToDos);
  return (
    <div>
      <Head>
        <title>Authenticated ToDo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>ToDo app</h1>
      </main>

    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const toDos = await table.select({}).firstPage();
    return {
      props: {
        initialToDos: minifyRecord(toDos)
      }
    }
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
}