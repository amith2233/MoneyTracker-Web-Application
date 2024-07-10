import LineYear from "./LineYear";
import {useState} from "react";
import {useContext, useEffect} from "react";
import axios from "axios";
import {MyContext} from "./MyContext";
import BarMonth from "./BarMonth";
import {format} from "date-fns";
import Pie from "./Pie";
function Analytics()
{
    const {token}=useContext(MyContext);
    const [budgetInfo,setBudgetInfo]=useState('');
    const currYear=new Date().getFullYear();
    const currMonth=format(new Date(),"MMMM");
    const[year,setYear]=useState(currYear);
    const [month,setMonth]=useState(currMonth);
    // console.log(year);
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
            <div className='pie-category'>
                <Pie month={month} year={year}/>
            </div>
            <div className='pie-payment'></div>
            <div className='line-year'>
                <LineYear budgetInfo={budgetInfo} setYear={setYear}/>
            </div>
            <div className='bar-month'>
                <BarMonth budgetInfo={budgetInfo} year={year} setMonth={setMonth}/>
            </div>
        </div>

    );
}
export default Analytics;