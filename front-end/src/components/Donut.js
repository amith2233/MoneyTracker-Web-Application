import {useEffect, useRef} from "react";
import * as d3 from 'd3';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {renderToString} from "react-dom/server";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
function Donut({budgetData})

{
    const donutRef=useRef();
    useEffect(()=>{

        d3.select(donutRef.current).selectAll('*').remove();
        const width=350;
        const height=250;

        const svg=d3.select(donutRef.current)
            .append('svg')
            .attr('width',width)
            .attr('height',height)
            .append('g')
            .attr('transform',`translate(${width/2},${height/2})`);

        const colorScale=d3.scaleOrdinal()
            .domain([`budgetUsed`,'budgetRemaining'])
            .range(['rgba(224, 151, 42, 0.9)','rgba(182, 208, 226, 0.5)']);


        const donutData=['budgetUsed','budgetRemaining'].map(key=>({
            category:key,
            value:key==='budgetUsed'?budgetData[key]:budgetData['budget']-budgetData['budgetUsed']
        }));

        const pie=d3.pie()
            .value(d=>d.value)
            .sort(null);

        const arcs=pie(donutData);

        // console.log(arcs);

        const arcGenerator=d3.arc()
            .innerRadius(70)
            .outerRadius(Math.min(width,height)/2-25)

        svg.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('fill',d=>colorScale(d.data.category))
            .attr('d',arcGenerator);

        svg.append('text')
            .attr('x',0)
            .attr('y',0)
            .attr('text-anchor','middle')
            .attr('font-size','15px')
            .attr('font-weight','bold')
            .attr('font-family','kodchasan')
            .text(`$${budgetData.budgetUsed}`)

        svg.append('text')
            .attr('x',0)
            .attr('y',20)
            .attr('text-anchor','middle')
            .attr('font-size','13px')
            .attr('fill','rgba(224, 151, 42, 0.85)')
            .attr('font-family','kodchasan')
            .attr('font-weight','bold')
            .attr('font-style','italic')
            .text('spent')

        const text=svg.append('text')
            .attr('font-family','kodchasan')
            .attr('font-size','15px')
            .attr('fill','rgba(0,0,0,0.6)')
            .attr('font-weight','bold')
            .attr('font-style','italic')

        text.append('tspan')
            .attr('x',110)
            .attr('y',`${height/2}`-25)
            .attr('text-anchor','middle')
            .text(`$ ${budgetData.budget-budgetData.budgetUsed}`)

        text.append('tspan')
            .attr('x',110)
            .attr('y',`${height/2}`-5)
            .attr('text-anchor','middle')
            .attr('font-weight','bold')
            .text('Remaining')

        text.append('tspan')
            .attr('x',-120)
            .attr('y',`${height/2}`-25)
            .attr('text-anchor','middle')
            .text(`$${budgetData.budget}`)

        text.append('tspan')
            .attr('x',-120)
            .attr('y',`${height/2}`-5)
            .attr('text-anchor','middle')
            .attr('font-weight','bold')
            .text('Monthly Limit')

        text.append('tspan')
            .attr('x',-175)
            .attr('y',-110)
            .attr('text-anchor','start')
            .attr('font-weight','bold')
            .attr('fill','black')
            .text('Budget')

        svg.append('foreignObject')
            .attr('x',-175)
            .attr('y',`${height/2}`-50)
            .attr('width',40)
            .attr('height',40)
            .style('cursor','pointer')
            .style('fill','rgba(9, 62, 165, 0.9)')
            .html(renderToString(<button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FontAwesomeIcon icon={faPencil}  /></button>))



    },[budgetData]);


    return(
        <div className='donut-chart-budget' ref={donutRef} >

        </div>


    );
}
export default Donut;