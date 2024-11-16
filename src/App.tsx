import { useRoutes } from 'react-router-dom';
import router from '@src/routers';
import './index.css';
import { GlobalProvider } from './context';

export default function App() {
  return <GlobalProvider>{useRoutes(router)}</GlobalProvider>;
}
