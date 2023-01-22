import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import store from '../../store'
import './weatherIconsBar.scss'

export default function WeatherIconsBar(props) {
  const [hours, setHours]=useState(null);
  const currentTime = +new Date().toLocaleTimeString([], {hour: '2-digit'});
  

  useEffect(()=>{
    (async()=>{
      const result = [];
      store.forecastData.hourly.time.forEach((time,i)=>{
        if(i<24){
          result.push({
            time:new Date(time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            temp: Math.round(store.forecastData.hourly.temperature_2m[i]),
            codes: store.forecastData.hourly.weathercode[i],
          })
        }
      })
      return result;
    })()
    .then((res)=>{
      
      

        let countOfElements = 24-currentTime;
        const hoursLeft = res.splice(currentTime+1,countOfElements);
        const AllRestDayTemparatures=hoursLeft.map((item)=>{
          return item.temp;
        });
        const currentHourForecast = res.splice(currentTime,1);
              currentHourForecast[0].restDayMinTemp = Math.min.apply(null,AllRestDayTemparatures);
        store.setCurrentWeather(currentHourForecast[0]);
        setHours(hoursLeft);
    })
  },[store.forecastData.hourly])
  

  return (
    <div className='weather-icons-bar'>
      <div className='container'>
      <ul>
        {
          hours?.map(
            ({time,temp})=>{
            return <li key={nanoid()}>
                      <span>{time}</span>
                      <span>{temp}°</span>
                    </li>
            }
          )
        }        
        </ul>
      </div>
    </div>
  )
}
