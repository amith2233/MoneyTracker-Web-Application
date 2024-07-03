import SideNav from "./SideNav";
import Header from "./Header";
import LandingBody from "./LandingBody";
import {useState} from "react";
import Expenses from "./Expenses";
import Reports from "./Reports";
import Analytics from "./Analytics";
import Profile from "./Profile";
function Landing()
{
    const[component,setComponent]=useState('');
    return (
        <div className='Landing'>
            <SideNav setComponent={setComponent}/>
            <div className='Landing-header-body'>
                <Header/>
                {component==='Dashboard'? (
                    <LandingBody/>
                ):component==='Manage'?(
                    <Expenses/>
                ):component==='Reports'?(
                    <Reports/>
                ):component==='Analytics'?(
                    <Analytics/>
                ):component==='Profile'?(
                    <Profile/>
                ):(
                    <LandingBody/>
                )}

            </div>

        </div>

    );
}
export default Landing;