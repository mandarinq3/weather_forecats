import React, { useEffect, useState } from 'react';
import './mainCard.scss';
import { observer } from "mobx-react-lite";
import store from '../../store';
import { icons, daysList, monthsList } from '../../constants'; 
import sunset from "../../icons/sunset.png";
import sunrise from "../../icons/sunrise.png";
import wind from '../../icons/wind.png';

function MainCard() {
  const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'});
  const [sunriseTime,setSunriseTime] = useState('--:--');
  const [sunsetTime,setSunsetTime] = useState('--:--');
  const [icon,setIcon] = useState([]);

  
  const [todayForecast,setTodayForecast] = useState(
    {
      code:0,
      currentTemp:0,
      minTemp:0,
      feelsLike:0,
    }
  );

  const dt= new Date();
  const date = {
    currentDate: dt.getDate(),
    currentMonth: dt.getMonth(),
    currentDay: dt.getDay(),
  };
 

 

  useEffect(() => {

    
    const deepClone = JSON.parse(JSON.stringify(store.currentWeather));
    
    store.forecastData !== null && setTodayForecast((prev)=>{
      let startIndex = deepClone !== null ? deepClone.time.indexOf(currentTime.substring(0,2)+':00') : '00:00';
      let temperatures = deepClone !== null ? deepClone.temperature_2m.splice(0,12) : '--';
      let min = temperatures !== '--' ?  Math.min(...temperatures) : '--';
      
      return {
        code:deepClone && deepClone.weathercode[startIndex],
        currentTemp:deepClone && deepClone.temperature_2m[startIndex],
        minTemp:min,
        feelsLike: Math.round(store.forecastData.daily.apparent_temperature_max[0]),
      };
    })
    setSunriseTime((prev)=>{
      return store.forecastData !== null ? new Date(store.forecastData.sunrise).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : prev
    });

    setSunsetTime((prev)=>{
      return store.forecastData !== null ? new Date(store.forecastData.sunset).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : prev
    } 
    );

  setIcon(()=>{
    const result=icons.filter((item)=>{
      return item.code.includes(todayForecast.code);
    })
  return result
  });
   

  }, [currentTime,todayForecast.code])

  
  return (
    <div className='main-card'>
      <div className='container'>
        <header>
            <span>{daysList[date.currentDay]}</span>
            <span>{monthsList[date.currentMonth]+' '+date.currentDate}</span>
        </header>

        <main>
          <div>
          <span className='icon'>
            {icon[0]!==undefined ? icon[0].icon : '--'}
          </span>
          </div>
          <div>
            <span>{todayForecast.currentTemp}°C</span>
            <span>{store.currentCityName}</span>
            <span>Feels Like: <b>{todayForecast.feelsLike}°C</b> </span>
          </div>
        </main>

        <footer>
          <span className='windspeed'>
              <img src={wind} alt='wind icon'/>
              <b>{store.forecastData !=null && store.forecastData.currentWindSpeed ? Math.round(store.forecastData.currentWindSpeed) : '--'} km/h</b>
            </span>
            <span className='sunrise'>
              <img src={sunrise} alt='sunrise icon'/> 
              <b>{sunriseTime}</b>
            </span>
            <span className='sunset'>
              <img src={sunset} alt='sunset icon'/> 
              <b>{sunsetTime}</b>
            </span>
        </footer>
      </div>
    </div>
  )
}


export default observer(MainCard);