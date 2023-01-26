import React, { useEffect, useState } from 'react';
import './header.scss';
import SearchInput from '../../components/search-input/SearchInput';
import { faLocationDot, faRainbow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cities, monthsList} from '../../constants';
import store from '../../store';

export default function Header(props) {

  const [currentTime, setCurrentTime] = useState('--:--');
  const [currentDate, setCurrentDate] = useState('');
  const [flip,setFlip] = useState(true);
  
  const dt= new Date();
  const date = dt.getDate();
  const monthIndex = dt.getMonth();

const getAndSetUserLocation = () =>{
  props.setLoading(true);
  props.setLoadingText('Getting your location...')
  
    store.getUserCoordinates()
    .then(
      ({coords}) => {
          return { lat:coords.latitude, lon:coords.longitude }
      }
    )

    .then(({lat,lon})=>{
        store.getUserCityName(lat,lon)
          .then(
            ({data})=>{
              return {
                  name: data.city, 
                  longitude: data.longitude, 
                  latitude: data.latitude 
              }
          })
          .then((newCity)=>{ 
            const existingCityNameList = cities.map(({name})=>{
              return name
            })
            if(!existingCityNameList.includes(newCity.name)){
                cities.push(newCity);
            }
            return newCity;
          })
          .then((location)=>{
            const isConfirmed = window.confirm(`${location.name} is this your current location?`)
            
            if(isConfirmed){
              props.setCityNameAndForecast(location);
              window.localStorage.setItem(props.USER_LOCATION, JSON.stringify(location));
            }            
          })
          //final
          .then(()=>{
                props.setLoading(false);
                props.setLoadingText('Getting your location...')
          })
          .catch((err)=>{
            console.log(err);
          })
    })
    .catch((err)=>{
      console.log(err);
    })
}
 

  useEffect(()=>{
    let logoFlipInterval = setInterval(()=>{ setFlip(!flip) },5000);
    let timerInterval    = setInterval(()=>{
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
    
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
    
        setCurrentTime(hours + ":" + minutes);
      }, 1000);

      setCurrentDate(`${monthsList[monthIndex].substring(0,3)} ${date}`)
    return ()=>{ 
      clearInterval(logoFlipInterval)
      clearInterval(timerInterval) 
    
    }
  },[monthIndex, date, flip])

  return (
    <header className="header">
      <div className='container'>
      <div className='logo'>
          <FontAwesomeIcon 
              icon={faRainbow} 
              size='xl' 
              className={flip ? 'flip' : ''}
          />
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          <span className='rain'></span>
          
          <span className='logo-text'>
            weather forecast
          </span>
        </div>
        <div className="user-location-btn" onClick={getAndSetUserLocation}>
          <FontAwesomeIcon icon={faLocationDot}/>
        </div>
        <SearchInput 
          setCityNameAndForecast={props.setCityNameAndForecast} 
          USER_LOCATION={props.USER_LOCATION}
        />

        <div className='display'>
          <span className='date'>{currentDate}</span>
          <span className='time'>{currentTime}</span>
        </div>
      </div>
    </header>
  )
}
