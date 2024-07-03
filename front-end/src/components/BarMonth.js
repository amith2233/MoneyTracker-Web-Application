import {useEffect, useState} from "react";
import * as d3 from "d3";

function BarMonth({budgetInfo,year})
{
    const [barData,setBarData]=useState([]);
    useEffect(()=>{
        if(budgetInfo.length>0)
        {
            const groupData=d3.group(budgetInfo,d=>d.year);
            // console.log(groupData);
            const specificYearData=groupData.get(year);
            // console.log(specificYearData)
            const monthData=specificYearData.map((data)=>({
                month:data.month,
                budget:data.budget,
                budgetUsed:data.budgetUsed
            }));
            setBarData(monthData);
        }
    },[budgetInfo]);
    // console.log(barData);
    return (
        <div>

        </div>

    );
}
export default BarMonth;