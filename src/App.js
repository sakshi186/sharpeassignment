import React, { useState , Component, useEffect }from 'react';
import './App.css';
import Chart from 'react-apexcharts'
import axios from 'axios';

const App =()=>  {
   
  const[option,setOption]=useState({
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: []
    }
  })

  const[series,setSeries] = useState([{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }])
  
  useEffect(()=>{
    const xax=[]
    const yax=[]
    axios.get("https://api.llama.fi/summary/fees/lyra?dataType=dailyFees")
    .then(response=>{
        console.log("response", response)
        response.data.totalDataChart.map(item =>{
          console.log("item",item[0],item[1])
          xax.push(item[0]);
          yax.push(item[1])
        })
        console.log(xax,"xax")
        console.log(yax,"yax")
        setOption({
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories:xax
          }
        })
        setSeries([{
          name: 'series-1',
          data: yax
        }])
    })
    .catch(error=>{
      console.log("error", error)
    })
  },[])
  
    return (
      <Chart options={option} series={series} type="line" width={1000} height={500} />
    )
  }
export default App;