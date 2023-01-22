import React, { useEffect, useState } from 'react';
import './header.scss';
import SearchInput from '../../components/search-input/SearchInput';
import { faRainbow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { monthsList} from '../../constants';

export default function Header() {

  const [currentTime, setCurrentTime] = useState('--:--');
  const [currentDate, setCurrentDate] = useState('');
  const [flip,setFlip] = useState(true);
  
  const dt= new Date();
  const date = dt.getDate();
  const monthIndex = dt.getMonth();
 

  useEffect(()=>{
    let i=0;
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
  })




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
        <SearchInput/>

        <div className='display'>
          <span className='date'>{currentDate}</span>
          <span className='time'>{currentTime}</span>
        </div>
      </div>
    </header>
  )
}
