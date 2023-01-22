import React from 'react';
import './mainCard.scss';
import { observer } from "mobx-react-lite";
import store from '../../store';
import { condition, daysList, monthsList } from '../../constants';

function MainCard() {
  const feelsLike = Math.floor(store.forecastData.daily.apparent_temperature_max[0]);
  const code=store.currentWeather && store.currentWeather.codes ? store.currentWeather.codes : 0 ;

  const dt= new Date();
  const date = {
    currentDate: dt.getDate(),
    currentMonth: dt.getMonth(),
    currentDay: dt.getDay(),
  };
 
  const forecast = condition.filter((item)=>{
    return item.code.includes(code);
  })

  return (
    <div className='main-card'>
      <div className='container'>
        <header>
            <span>{daysList[date.currentDay]}</span>
            <span>{monthsList[date.currentMonth]+' '+date.currentDate}</span>
        </header>
        <main>
          <div>
            <span>{forecast[0].icon}</span>
          </div>
          <div>
            <span>{store.currentWeather ? store.currentWeather.temp : '--'}°C</span>
            <span>
              {store.currentCityName}
            </span>
            <span>MIN:<b>{store.currentWeather ? store.currentWeather.restDayMinTemp : '--'}°C</b></span>
            <span>FL: <b>{feelsLike}°C</b> </span>
          </div>
        </main>
        <footer>
          <span>{forecast[0].description}</span>
        </footer>
      </div>
    </div>
  )
}


export default observer(MainCard);