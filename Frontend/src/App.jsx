import Navbar from "./components/Navbar";
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import SignIn from './pages/SignIn';
import SingUp from './pages/SingUp';
import {Toaster } from 'react-hot-toast';
const App = () => {
   return (
     <div>

      <Toaster 
          position="top-center"
          reverseOrder={false} 
      />
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/CreatePage" element = {<CreatePage/>} />
            <Route path="/SignIN" element={<SignIn/>} />
            <Route path="/SignUP" element={<SingUp/>} />
        </Routes>
     </div>
   )
}
 
 export default App