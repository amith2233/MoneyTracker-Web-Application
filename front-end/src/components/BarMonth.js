import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {easeLinear} from "d3";
function BarMonth({budgetInfo,year,setMonth})
{
    const myNode=useRef();
    const [barData,setBarData]=useState([]);
    const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(()=>{
        if(budgetInfo.length>0)
        {
            const groupData=d3.group(budgetInfo,d=>d.year);
            // console.log(groupData);
            // console.log(year);
            const specificYearData=groupData.get(year);
            // console.log(specificYearData)
            specificYearData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
            const monthData=specificYearData.map((data)=>({
                month:data.month,
                budget:data.budget,
                budgetUsed:data.budgetUsed,
            }));
            // console.log(monthData);
            setBarData(monthData);
        }
    },[budgetInfo,year]);
    // console.log(barData);
    useEffect(()=>{
        const width=500;
        const height=500;
        if(barData && barData.length>0) {

            d3.select(myNode.current).selectAll('*').remove();

            const svg = d3.select(myNode.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate (40,${height-100})`);

            const xScale=d3.scaleBand()
                .domain(d3.map(barData,d=>d.month))
                .range([0,width-100])
                .padding(0.2);

            const yScale=d3.scaleLinear()
                .domain([0,d3.max(barData,d=>d.budget)])
                .range([0,-height+150]);
            console.log(yScale(600));

            svg.append('g')
                .call(d3.axisBottom(xScale));

            svg.append('g')
                .call(d3.axisLeft(yScale));
             console.log(barData);

            svg.selectAll("rect")
                .data(barData)
                .enter()
                .append("rect")
                .attr("class", "rect")
                .attr("x", d => xScale(d.month))
                .attr("width", xScale.bandwidth())
                .attr("fill","#ff7400")
                .on("click",(event,d)=>{
                    setMonth(d.month);
                });


        svg.selectAll('rect')
            .transition()
            .duration(1300)
            .ease(easeLinear)
            .attr("y", d => yScale(d.budget))
            .attr("height", d=>-yScale(d.budget))
        ;
        }

    },[barData]);
    return (
        <div ref={myNode} className='bar-month'>

        </div>

    );
}
export default BarMonth;