import {useEffect, useRef, useState} from "react";

import * as d3 from 'd3';

function LineYear({budgetInfo})
{
    const [lineData,setLineData]=useState([]);
    const myNode=useRef();
    useEffect(()=>{
        if(budgetInfo.length>0)
        {
            const groupedData=d3.group(budgetInfo,d=>d.year);
            // console.log(groupedData);
            const aggregatedData=Array.from(groupedData,([key,value])=>({
                year:key,
                totalBudget:d3.sum(value,d=>d.budget),
                totalBudgetUsed:d3.sum(value,d=>d.budgetUsed)
            }));
            setLineData(aggregatedData);
        }
        console.log(lineData);
    },[budgetInfo]);

    useEffect(()=>{
            const width=600;
            const height=600;
        if(lineData && lineData.length>0)
        {
            d3.select(myNode.current).selectAll('*').remove();

            const svg=d3.select(myNode.current)
                .append('svg')
                .attr('width',width-50)
                .attr('height',height-50)
                .append('g')
                .attr('transform',`translate (15,${height/5})`);

            const xMin=d3.min(lineData,d=>d.year);
            const xMax=d3.max(lineData,d=>d.year);
            const xAxis=d3.scaleLinear()
                .domain([xMin,xMax])
                .range([0,width-100]);

            svg.call(d3.axisBottom(xAxis).ticks(8));
            console.log(lineData.length)
            console.log(xAxis.ticks())

            const yMin=d3.min(lineData,d=>d.totalBudget);
            const yMax=d3.max(lineData,d=>d.totalBudget);
            console.log(yMin);

            const yAxis=d3.scaleLinear()
                .domain([yMin,yMax])
                .range([350,0]);

            svg.append('g')
                .attr('transform',`translate(20,0)`)
                .call(d3.axisLeft(yAxis).ticks(9));







        }

    },[lineData]);

    return (
        <div ref={myNode} style={{border:'1px solid black'}}></div>
    );
}
export default LineYear;