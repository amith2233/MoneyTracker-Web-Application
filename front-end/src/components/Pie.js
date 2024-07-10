import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {MyContext} from "./MyContext";
import * as d3 from 'd3';
function Pie({month,year})
{
    const {token}=useContext(MyContext);
    const[monthExpenses,setMonthExpenses]=useState([]);
    const[pieData,setPieData]=useState([]);
    const ref=useRef();

    useEffect(()=>
        {
            axios.get("http://localhost:8080/expenses/month",{
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                params:{
                    month:month,
                    year:year
                }
            })
                .then((res)=>{
                    const data=res.data;
                    const mappedData=data.map((exp)=>({
                        category:exp.category,
                        amount:exp.amount
                    }));
                    setMonthExpenses(mappedData);
                })
                .catch((err)=>{
                    console.error(err);
                });
        },[token,month,year]);

    // console.log(monthExpenses);
    // console.log(year);
    useEffect(()=>{
        if(monthExpenses.length>0) {
            const groupedData = d3.group(monthExpenses, (d) => d.category);
            // console.log(groupedData);
            const aggregatedData=Array.from(groupedData,([key,value])=>({
                category:key,
                totalAmount:d3.sum(value,d=>d.amount).toFixed(1)
            }));
            // console.log(aggregatedData);
            setPieData(aggregatedData);
        }
        else
        {
            setPieData([]);
        }

    },[monthExpenses]);

    useEffect(()=>
    {
        const width=300;
        const height=300;
        if(pieData && pieData.length>0) {
            d3.select(ref.current).selectAll('*').remove();

            const svg = d3.select(ref.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2},${height / 2})`);

            const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

            const pie=d3.pie()
                .value(d=>d.totalAmount)
                .sort(null);

            // console.log(pie);
            const arcs=pie(pieData);

            // console.log(arcs);

            const arcGenerator = d3.arc()
                .innerRadius(0)
                .outerRadius(Math.min(width, height) / 2 - 35);

            svg.selectAll('path')
                .data(arcs)
                .enter()
                .append('path')
                .attr('fill', (d, i) => colorScale(i))
                .attr('d', arcGenerator);

            svg.selectAll('text')
                .data(arcs)
                .enter()
                .append('text')
                .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
                .attr('text-anchor', 'middle')
                .attr('font-size','14px')
                .text(d => d.data.category);
        }
        else
        {
            d3.select(ref.current).selectAll('*').remove();
        }
    },[pieData]);

 return (
        <div className='pie-chart-month' >
            <div ref={ref}></div>
            {pieData.length===0 && <p>No data available for selected month and year</p>}
        </div>

   );
}
export default Pie;