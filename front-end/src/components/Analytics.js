import LineYear from "./LineYear";
import {useState} from "react";
import {useContext, useEffect} from "react";
import axios from "axios";
import {MyContext} from "./MyContext";
import BarMonth from "./BarMonth";

function Analytics()
{
    const {token}=useContext(MyContext);
    const [budgetInfo,setBudgetInfo]=useState('');
    const[year,setYear]=useState(2024);
    useEffect(()=>{
        axios.get("http://localhost:8080/budget/user", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res)=>{
            setBudgetInfo(res.data);

        })
            .catch((err)=>{
                console.log(err);
            })

    },[token]);

    return (
        <div className='analytics'>
            <div className='pie-category'></div>
            <div className='pie-payment'></div>
            <div className='line-year'>
                <LineYear budgetInfo={budgetInfo} setYear={setYear}/>
            </div>
            <div className='bar-month'>
                <BarMonth budgetInfo={budgetInfo} year={year}/>
            </div>
        </div>

    );
}
export default Analytics;