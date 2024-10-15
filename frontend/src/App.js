import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Eventlist from './pages/Eventslist';
import Createevent from './pages/Createevent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Loginroutes from './pages/Loginroutes';
import Dashboard from './pages/Dashboard';
import Admintasks from './pages/admin/Admintasks';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Changepassword from './pages/Changepassword';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       
       <Routes>
         <Route path="login" element={<Login/>}></Route>
         <Route path="signup" element={<Signup />}></Route>
         <Route element={<Loginroutes />}>
           <Route path="/" element={<Dashboard />}>
             <Route path="/" element={<Eventlist />}></Route>
             <Route path='adimntasks' element={< Admintasks/>}></Route>
             <Route path="create" element={<Createevent />}></Route>
             <Route path='users' element={<Users/>}></Route>
             <Route path='profile' element={<Profile/>}></Route>
             <Route path='changepassword' element={<Changepassword/>}></Route>
           </Route>
         </Route>


       </Routes>
     </BrowserRouter>

    </div>
  );
}

export default App;
