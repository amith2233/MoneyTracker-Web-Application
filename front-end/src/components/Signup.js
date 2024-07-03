import {useEffect, useState} from "react";
import axios from "axios";
import {Link,useLocation} from "react-router-dom";

function Signup()
{
    const location=useLocation();
    const email=location.state?.email;
    const [formdata,setFormData]=useState({
        name:'',
        email: '',
        password:'',
        phone:'',
        gender: '',
        country:' ',
        roles:'ROLE_USER'
    });

    useEffect(()=>
    {
        if(email)
        {
            setFormData(prevformdata => ({...prevformdata,email:email}));

        }
    },[email]);
    useEffect(()=> {

        axios.get("http://ip-api.com/json").then((res) => {
            setFormData(prevformdata => ({...prevformdata,country: res.data.country}));
        })
            .catch((error) => {
                console.error('Error fetching IP Address', error);
            });
    },[]);
    const handleChange=(e)=>
    {
        setFormData({...formdata,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        axios.post("http://localhost:8080/users/adduser",formdata)
        setFormData({
            name: '',
            email: '',
            password: '',
            phone: '',
            gender: '',
        });

    }
    return(
        <div className='Signup'>
            <div className='Signup-container'>
                <div className='Signup-container-logo'>
                    <div className='Signup-container-logo-header'>
                        <img src="Moneytracker.png" alt="not found"/>
                        <h4>MoneyTracker</h4>
                    </div>
                    <div className='Signup-container-logo-body'>
                        <div className='Signup-container-logo-body-content'>
                        <h1>Welcome Back!</h1>
                        <p >login with your personal info</p>
                        </div>
                        <Link to="/login"><button  style={{border:'1px solid black'}} type='button'  className='Signup-form-input-button'>SIGN IN</button></Link>
                    </div>
                </div>
                <div className='Signup-container-input'>
                    <form onSubmit={handleSubmit} className='Signup-form'>
                        <h1>Create Account</h1>
                        <input type='text' placeholder='Name' name='name'  value={formdata.name} className='Signup-form-input' onChange={handleChange} required/>
                        <input type='email' placeholder='Email' name='email' value={formdata.email} className='Signup-form-input' onChange={handleChange} required/>
                        <input type='password' placeholder='Password' name='password' value={formdata.password} className='Signup-form-input' onChange={handleChange} required/>
                        <input type='tel' placeholder='Phone' name='phone' value={formdata.phone} className='Signup-form-input' onChange={handleChange} required  />
                        <div className='Signup-form-radio-button'>
                        <p>Gender</p>
                        <label><input type='radio' value='M' name='gender' checked={formdata.gender==='M'} onChange={handleChange}/>Male</label>
                        <label><input type='radio' value='F' name='gender' checked={formdata.gender==='F'} onChange={handleChange}/>Female</label>
                        <label><input type='radio' value='O' name='gender' checked={formdata.gender==='O'} onChange={handleChange}/>Others</label>
                        </div>
                        <div><button  type='submit' className='Signup-form-input-button'>SIGN UP</button></div>
                    </form>
                    <div className='Signup-line'>
                        <div className='line'></div>
                        <div className='text'>Or</div>
                        <div className='line'></div>
                    </div>

                </div>

            </div>
        </div>

    );
}
export default Signup;