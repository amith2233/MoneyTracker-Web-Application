import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
// import LoginToken from "./components/LoginToken";
import Landing from "./components/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import {useContext} from "react";
import {MyContext} from "./components/MyContext";
import AddExpense from "./components/AddExpense";

function App() {

    const {token,setToken}=useContext(MyContext);
  return (
    <div className="App">
            <Routes>
                <Route exact path="/" element={token ?<Home token={token}/> : <Home/>}/>
                <Route path="/signup" element={token ? <Navigate to="/landing"/> : <Signup/>} />
                <Route path="/login" element={ token ? <Navigate to="/landing"/> : <Login setToken={setToken}/>} />
                <Route path="/landing" element={<ProtectedRoute token={token}><Landing/></ProtectedRoute>}/>
                <Route path="/addexpense" element={<AddExpense/>}/>
            </Routes>

    </div>
  );
}

export default App;
