import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function GetStarted()
{
    const [email,setEmail]=useState('');
    const navigate=useNavigate();
    const handleChange=(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
}
    const handleStarted=()=>
    {
        axios.get("http://localhost:8080/users/email",{params:{email:email}}).then((res)=>
        {
            if(res.data===false)
            {
                navigate('/signup',{state:{email}});

            }
            else
            {
                navigate('/login',{state:{email}});
            }
        })

    }


    return (
        <div className='GetStarted'>
            <div className='home-description'><h4>Take Control Of Your Money And Forecast Your <br/> <br/> <span className='second-line'>Spending Into The Future...</span></h4></div>
            <div className='home-signup'>
                <input type='text' className='home-signup-email' value={email} name='username' placeholder='Your email address' onChange={handleChange}/>
                <button type='button' onClick={handleStarted}>Get Started</button>
            </div>
        </div>

    );
}
export default GetStarted;