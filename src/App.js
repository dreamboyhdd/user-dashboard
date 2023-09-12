import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routers } from './Router/Routers';

function App() {
  return (
    <div class="wrapper">
      <ToastContainer />
      <Routers />
    </div>
  );
}

export default App;
