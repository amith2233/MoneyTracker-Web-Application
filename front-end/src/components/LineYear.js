import {useEffect, useRef, useState} from "react";

import * as d3 from 'd3';

function LineYear({budgetInfo,setYear})
{
    const [lineData,setLineData]=useState([]);
    const [selectedYear,setSelectedYear]=useState(null);
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
        // console.log(lineData);
    },[budgetInfo]);

    useEffect(()=>{
            const width=500;
            const height=500;
        if(lineData && lineData.length>0)
        {
            d3.select(myNode.current).selectAll('*').remove();

            const svg=d3.select(myNode.current)
                .append('svg')
                .attr('width',width)
                .attr('height',height)
                .append('g')
                .attr('transform',`translate (40,${height-100})`);

            const xMin=d3.min(lineData,d=>d.year);
            const xMax=d3.max(lineData,d=>d.year);

            const xAxis=d3.scaleLinear()
                .domain([xMin,xMax])
                .range([0,width-100]);

            svg.append('g')
                .call(d3.axisBottom(xAxis).ticks(8));

            // console.log(lineData.length)
            // console.log(xAxis.ticks())

            const yMin=d3.min(lineData,d=>d.totalBudget);
            const yMax=d3.max(lineData,d=>d.totalBudget);
            // console.log(yMin);

            const yAxis=d3.scaleLinear()
                .domain([yMin,yMax])
                .range([0,-height+150]);

            svg.append('g')
                .call(d3.axisLeft(yAxis).ticks(8));

            const line = d3
                .line()
                .defined(d => !isNaN(d.totalBudget))
                .x(d => xAxis(d.year))
                .y(d => yAxis(d.totalBudget));


            svg.append('g')
                .append('path')
                .datum(lineData)
                .attr('fill', 'none')
                .attr('stroke', '#5E97B6')
                .attr('stroke-width', 2.5)
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('d', line)
                .attr('class','line-chart');

            const tooltip = d3.select(myNode.current).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style("position", "absolute")
                .style("background", "lightsteelblue")
                .style("border-radius", "4px")
                .style("padding", "5px")
                .style("pointer-events", "none");

            svg.selectAll("circle")
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", d => xAxis(d.year))
                .attr("cy", d => yAxis(d.totalBudget))
                .attr("r", 6)
                .attr('fill','#5E97B6')
                .attr('class',(d)=>(d.year===selectedYear ? "selected" : ""))
                .on("mouseover",(event,d)=>{
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(`budget: ${d.totalBudget}$<br/>budgetUsed: ${d.totalBudgetUsed}$`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", () => {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .on("click",(event,d)=>{
                        svg.selectAll('circle')
                            .attr('opacity', 0.5);
                        d3.select(event.currentTarget)
                            .attr('opacity', 1);
                        d3.selectAll('.line-chart')
                            .attr('opacity', 0.5);
                        setYear(d.year);
                        setSelectedYear(d.year);
                });

        }

    },[lineData]);

    return (
        <div ref={myNode} className='line-year' ></div>
    );
}
export default LineYear;