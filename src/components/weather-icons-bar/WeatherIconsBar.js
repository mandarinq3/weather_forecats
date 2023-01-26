import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import store from '../../store'
import './weatherIconsBar.scss'

export default function WeatherIconsBar() {

  const [cardDataList, setCardDataList]=useState( {time: [],temp: []});
  const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'});

  useEffect(()=>{
    //copying hourly forecast object
    let deepClone = JSON.parse(JSON.stringify(store.forecastData.hourly));

    //rounding float format of temperature 
    deepClone.temperature_2m = deepClone.temperature_2m.map((temp)=>{
      return Math.floor(temp)
    })

    //turning date array into time array
    deepClone.time=deepClone.time.map((date)=>{
     return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    })

;

    //finding start index to slice 168 el array into 12 elements
    let startIndex = deepClone.time.indexOf(currentTime.substring(0,2)+':00')+1
        

    setCardDataList(
      {
        time: deepClone.time.splice( startIndex ,12),
        temp: deepClone.temperature_2m.splice( startIndex ,12)
      }
    ) 

    store.setCurrentWeather(deepClone);

  },[currentTime])

  return (
    <div className='weather-icons-bar'>
      <div className='container'>
      <ul>
        {
          cardDataList.time.map(
            (time,i)=>{
            return <li key={nanoid()}>
                      <span>{time}</span>
                      <span>{cardDataList.temp[i]}°</span> 
                    </li>
            }
          )
        }        
        </ul>
      </div>
    </div>
  )
}
