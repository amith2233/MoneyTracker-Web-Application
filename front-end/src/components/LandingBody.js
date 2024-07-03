import {useContext, useEffect, useState} from "react";
import {MyContext} from "./MyContext";
import axios from "axios";
import Pie from "./Pie";
import Donut from "./Donut";
import EditDialog from "./EditDialog";
function LandingBody()
{
    const [budgetData,setBudgetData]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const {token}=useContext(MyContext);
    // console.log(budgetData);
    useEffect(()=>
    {
        axios.get("http://localhost:8080/budget/check",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then((res)=>{
                    setBudgetData(res.data);
            })
            .catch((error)=>{
                console.error("error fetching data",error);
            })
            .finally(()=>
            {
                setIsLoading(false);
            });
    },[token]);

    const handleSet=()=>
    {
        axios.post("http://localhost:8080/budget/set",{'budget':1000},{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then((res)=>
            {
                alert("budget set successful");
            })
            .catch((err)=>
            {
                alert("error occurred");
            });
    };

    return (
        <div className='LandingBody'>
            <div className='item1'>
                <Pie/>
            </div>
            <div className='item2'>
                {isLoading?(
                    <p>is loading....</p>
                ):budgetData?(
                    <>
                    <Donut budgetData={budgetData}/>
                    <EditDialog/>
                    </>
                ):(
                    <button type="button" onClick={handleSet}>Get Started</button>
                )}
            </div>
            <div className='item3'></div>
        </div>



    );
}
export default LandingBody;