import { ToDoProvider } from '../contexts/ToDoContext';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <ToDoProvider>
      <div className="container mx-auto my-10 max-w-xl">
        <Component {...pageProps} />
      </div>
    </ToDoProvider>
    );
}

export default MyApp;
