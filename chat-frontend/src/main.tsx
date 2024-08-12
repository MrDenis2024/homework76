import ReactDOM from 'react-dom/client';
import App from './App';
import {CssBaseline, ThemeProvider} from '@mui/material';
import 'react-toastify/dist/ReactToastify.min.css';
import theme from './theme';
import {ToastContainer} from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <ToastContainer position="top-right" />
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
