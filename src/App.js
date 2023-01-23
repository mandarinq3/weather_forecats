import { useEffect, useRef, useState } from 'react';
import './App.scss';
import Header from './sections/header/Header';
import Main from './sections/main/Main';
import LoadingStartPage from './components/loading-start-page/LoadingStartPage';
import Dropdown from './components/dropdown/Dropdown';
import {cities} from './constants';
import store from './store';




function App() {
  const appRef = useRef();
  const [loading, setLoading] = useState(true);


  useEffect(()=>{ 

  store.getUserCoordinates()
    .then(
      ({coords}) => {
          return { lat:coords.latitude, lon:coords.longitude }
      }
    )
    .then(
      (res)=>{
        store.getUserCityName(res.lat, res.lon)
          .then(
            (res)=>{
              const cityName = res.data.city;
              return {
                  name: cityName, 
                  longitude: res.data.longitude, 
                  latitude: res.data.latitude 
              }
            }
          )
          .then(
            (newCity)=>{ 
              const existingCityNameList = cities.map(({name})=>{
                return name
              })
              if(!existingCityNameList.includes(newCity.name)){
                cities.push(newCity);
              }
              return newCity;
            }
          )
          .then(
            (res)=>{
              store.initializeCurrentCityName(res.name);
              store.getForecastData(res.latitude,res.longitude)
                .then(
                  ({data})=>{

                    return {
                      daily:data.daily,
                      hourly: data.hourly,
                      currentWindSpeed : data.current_weather.windspeed,
                      sunrise: data.daily.sunrise[0],
                      sunset: data.daily.sunset[0],
                    }
                  }
                )
                .then(
                  (data)=>{
                    setLoading(false);
                    store.initializeForecastData(data);
                    return data.daily.weathercode[0];
                  }
                )
                .catch((e)=>{
                  console.log(e);
                })
            }
          )
//================ERROR LOG==========
          .catch(
            (err) => {
              console.error(err.message);
            }
          );
//===================================== 
  })
  .catch((e)=>{
    console.log(e);
  })
  },[]);


  return (
    <div className="app" ref={appRef} >
      {loading
      ? <LoadingStartPage/>
      : <>
          <Header/>
          <Dropdown/>
          <Main/>
        </>
    }
      </div> 
  );
}

export default App;
