import ReactDom from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>
);
