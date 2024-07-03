import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "./MyContext";
import {Alert, AlertTitle} from "@mui/material";
function Profile()
{
    const {token}=useContext(MyContext);
    const [showAlert,setShowAlert]=useState(false);
    const [profile,setProfile]=useState({
        name: '',
        email: '',
        gender: '',
        country: '',
        phone: ''
    });
    useEffect(()=>
    {
        axios.get("http://localhost:8080/users/user",{
            headers:{'Authorization':`Bearer ${token}`
            }
        })
            .then((res)=>{
                setProfile(res.data);
            })

    },[token]);
    const handleSave=(e)=>
    {
        e.preventDefault();
        axios.put("http://localhost:8080/saveuser", profile, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res)=>{
            if(res)
            {
                handleAlert();
            }
        })

    }
    const handleChange=(e)=>
    {
        setProfile({...profile,[e.target.name]:e.target.value});
    }
    const handleAlert=()=>{
        setShowAlert(true);
    }
    return (
        <div className='profile' style={{backgroundColor:'white'}}>

            <form className='profile-form' onSubmit={handleSave}>

                {showAlert && <Alert severity="success">profile updated successfully</Alert>}
                <h2>Edit Profile</h2>
                <div className='profile-label-input'>
                    <label>Name</label>
                    <input type='text'  name='name' value={profile.name} onChange={handleChange}/>
                </div>
                <div className='profile-label-input'>
                    <label>Email</label>
                    <input type='text' name='email' value={profile.email} onChange={handleChange}/>
                </div>
                <div className='profile-label-inputs'>
                    <div className='profile-label-input'>
                        <label>Gender</label>
                        <input type='text' name='gender' maxLength={1} value={profile.gender} onChange={handleChange} style={{width:'130px'}}/>
                    </div>
                    <div className='profile-label-input' >
                        <label>Country</label>
                        <input type='text' name='country' value={profile.country} onChange={handleChange} style={{width:'130px'}}/>
                    </div>
                </div>
                <div className='profile-label-input'>
                    <label>Phone</label>
                    <input type='tel' name='phone' value={profile.phone} onChange={handleChange}/>
                </div>
                <div className='submit-button-container'>
                    <button className='profile-submit-button' type='submit'>Save</button>
                </div>

            </form>

        </div>

    );
}
export default Profile;