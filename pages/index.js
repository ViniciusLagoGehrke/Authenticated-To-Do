import { useEffect, useContext } from 'react';
import Head from 'next/head'
import Navbar from '../components/NavBar'
import ToDo from '../components/ToDo';
import { table, minifyRecord } from './api/utils/Airtable';
import { ToDoContext } from '../contexts/ToDoContext';
import auth0 from './api/utils/auth0';
import ToDoForm from '../components/ToDoForm';

export default function Home({ initialToDos, user }) {
  
  const {toDos, setToDos} = useContext(ToDoContext);
  
  useEffect(() => {
    setToDos(initialToDos);
  }, []);

  return (
    <div>
      <Head>
        <title>Authenticated ToDo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main>
        {user && (
          <>
            <h1 className="text-2xl text-center mb-4">My ToDo</h1>
            <ToDoForm />
            <ul>
              {toDos && toDos.map(toDo => 
                  <ToDo
                    key={toDo.id}
                    toDo={toDo}
                  />
              )}
            </ul>
          </>
        )}
      </main>

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);

  try {
    const toDos = await table.select({}).firstPage();
    return {
      props: {
        initialToDos: minifyRecord(toDos),
        user: session?.user || null
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