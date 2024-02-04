import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
// import './App.css';

function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
