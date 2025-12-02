import Navbar from "./components/Navbar";
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import SignIn from './pages/SignIn';
import SingUp from './pages/SingUp';

const App = () => {
   return (
     <div>
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