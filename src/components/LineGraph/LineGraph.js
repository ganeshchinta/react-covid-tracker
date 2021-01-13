import React, {useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

function LineGraph(props) {
 const options={
     legend:{
         display:false,
     },
     elements:{
         point:{
             radius:0,
         },
     },
     maintainAspectRatio:false,
     tooltips:{
         mode:"index",
         intersect:false,
         callbacks:{
             label:function(tooltipItem,data){
                 return numeral(tooltipItem.value).format("+0,0");
             },
         },
     },
     scales:{
         xAxes:[
             {
                 type:"time",
                 time:{
                     format:"MM/DD/YY",
                     tooltipFormat:"ll",
                 },
             },
         ],
         yAxes:[
             {
                 gridlines:{
                     display:false,

                 },
                 ticks:{
                     callback:function(value,index,values){
                         return numeral(value).format("0a");
                     },
                 },
             },
         ],
     },
 }

const buildChartData =(data,chartType)=>{
     
        const chartData=[];
        let lastDataPoint;
    for(let date in data[chartType]){
        if(lastDataPoint){          
            const newDataPoint={
                x:date,
                y:data[chartType][date]-lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint =data[chartType][date]
    }
  
    return chartData;
    }


    
    return (

        <div>
            <Line
            options={options}
             data={{
                 datasets:[
                     {
                         backgroundColor:"rgba(204,16,52,0.5)",
                         borderColor:"#CC1034",
                     data:buildChartData(props.graphData,props.casesType)
                    }
                ],
                }}
                />
        </div>
    )
}

export default LineGraph
