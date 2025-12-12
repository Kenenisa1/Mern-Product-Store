import Navbar from "./components/Navbar";
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {Toaster } from 'react-hot-toast';
import Products from "./components/products";
import Footer from "./components/Footer";
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
            <Route path="/Signin" element={<SignIn/>} />
            <Route path="/SignuP" element={<SignUp/>} />
            <Route path="/Products" element={<Products/>} />
        </Routes>
        <Footer/>
     </div>
   )
}
 
 export default App