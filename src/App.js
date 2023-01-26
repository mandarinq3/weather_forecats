import { useEffect, useRef, useState } from 'react';
import './App.scss';
import Header from './sections/header/Header';
import Main from './sections/main/Main';
import LoadingStartPage from './components/loading-start-page/LoadingStartPage';
import Dropdown from './components/dropdown/Dropdown';
import store from './store';


function App() {
  const appRef = useRef();
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Preparing forecast for you...');
  const USER_LOCATION = 'user-location';

const setCityNameAndForecast = ({name, longitude, latitude})=>{
  setLoading(true);
  setLoadingText('Preparing forecast for you...')
      store.initializeCurrentCityName(name);
      store.getForecastData(latitude,longitude)
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


  useEffect(()=>{
    (async()=>{
      return JSON.parse(window.localStorage.getItem(USER_LOCATION));
    })()
    .then((userLocation)=>{
      if(userLocation){
        setCityNameAndForecast(userLocation)
      }
      else{
          setCityNameAndForecast({
          name: 'Leipzig', 
          longitude: 12.36, 
          latitude: 51.34
        })
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])


  return (
    <div className="app" ref={appRef} >
      {loading
      ? <LoadingStartPage text={loadingText}/>
      : <>
          <Header 
            setCityNameAndForecast={setCityNameAndForecast} 
            USER_LOCATION={USER_LOCATION}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
            />
          <Dropdown/>
          <Main/>          
        </>
    }
      </div> 
  );
}

export default App;
