import React from 'react';
import './main.scss';
import MainCard from '../../components/main-card/MainCard';
import SecondaryCard from '../../components/secondary-card/SecondaryCard';
import WeatherIconBar from '../../components/weather-icons-bar/WeatherIconsBar';
import store from '../../store';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react-lite';
import { daysList} from '../../constants';

function Main() {
  

  return (
    <main className="main">
      <div className='sections-wrapper'>
        <div className='section main-card-section'>
          <MainCard />
        </div>

        <div className='section secondary-card-section'>
          {
            store.forecastData.daily.weathercode.map((code,_i)=>{
              const dayNameIndex = new Date(store.forecastData.daily.time[_i]).getDay().toLocaleString();
              if(_i!==0){
                return <SecondaryCard 
                        key={nanoid()} 
                        day={daysList[dayNameIndex]} 
                        temp={Math.round(store.forecastData.daily.temperature_2m_max[_i])} 
                        code={code}
                      />
              }
              else{
                return null;
              }
              
            })
          }
        </div>

        <div className='section weather-icon-bar-section'>
          <WeatherIconBar/>
        </div>

      </div>
    </main>
  )
}


export default observer(Main);
