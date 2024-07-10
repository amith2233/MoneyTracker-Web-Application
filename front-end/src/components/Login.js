import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

function Login({setToken})
{
    // const navigate=useNavigate();
    const location=useLocation();
    const email=location.state?.email;
    const [logindata,setLoginData]=useState({
        username:'',
        password:''
    });
    useEffect(()=>
    {
     if(email)
     {
         setLoginData({...logindata,username:email});
     }
    },[email]);
    const handleChange=(e)=>
    {
        setLoginData({...logindata,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        axios.post("http://localhost:8080/authenticate",logindata).then((res)=>
        {
            setToken(res.data);
        });
        setLoginData({
            username: '',
            password: ''

        });

    }

    return(
        <div className='Login'>
                <div className='Login-container'>
                    <div  className='Login-container-input'>
                        <div className='Login-container-input-header'>
                            <img src="Moneytracker.png" alt="not found"/>
                            <h4>MoneyTracker</h4>
                        </div>
                        <form  className='Login-form' onSubmit={handleSubmit}>
                            <h1>Sign in to MoneyTracker</h1>
                            <input type='email' placeholder='Email' name='username' value={logindata.username} className='Signup-form-input' onChange={handleChange} required/>
                            <input type='password' placeholder='Password' name='password' value={logindata.password} className='Signup-form-input' onChange={handleChange} required/>
                            <div><button type='submit' className='Signup-form-input-button'>SIGN IN</button></div>
                        </form>
                        <div className='Login-line'>
                            <div className='line'></div>
                            <div className='text'>Or</div>
                            <div className='line'></div>
                        </div>

                    </div>

                    <div style={{gap:'1em'}} className='Login-container-logo'>
                            <div className='Login-container-logo-body'>
                                <h1>Hello Guest!</h1>
                                <p >Enter your personal details <br/>to get started</p>
                            </div>
                        <Link to="/signup"><button  style={{border:'1px solid black'}} type='button' className='Login-form-input-button'>SIGN UP</button></Link>
                        </div>
                    </div>
        </div>

    );
}
export default Login;