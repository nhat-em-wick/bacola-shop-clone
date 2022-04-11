import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.scss';
import Router from './router/Router.jsx'
toast.configure();
function App() {
  return (
    <> 
      <Router/>
    </>
  );
}

export default App;
