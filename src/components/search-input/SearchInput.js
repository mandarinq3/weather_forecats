import { faEarthAmericas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';
import { cities } from '../../constants';
import store from '../../store';
import './searchInput.scss';

function SearchInput(props) {
  const inputRef = useRef();
  const listRef = useRef();
  const earthRef = useRef();
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);


  useEffect(()=>{
    setFilteredLocations(cities);
  },[])

  return (
    <div className='search-input'>
      <div className='wrapper'>
    
        <input 
            ref={inputRef}
            type='text' 
            placeholder='search...' 
            className={show ? 'input show': 'input'} 
            value={inputValue}
            onInput={(e)=>{
              let reg = new RegExp(e.target.value,'gi');
              const filtered=cities.filter((loc)=>{
                return loc.name.match(reg);
              })

              setFilteredLocations(e.target.value === '' ? cities : filtered);
              setInputValue(e.target.value);

            }}
            />


        <ul ref={listRef} className={show ? 'show' : ''}>
          {
            filteredLocations.map((item, _k)=>{
              return (
              <li 
                key={nanoid()}
                onClick={()=>{
                  const city = {
                    latitude:item.latitude,
                    longitude:item.longitude,
                    name:item.name
                  }
                  setShow(!show);
                  props.setCityNameAndForecast(city);
                  window.localStorage.setItem(props.USER_LOCATION,JSON.stringify(city)) 
                }}>{item.name}
              </li>
              )
            })
          }
        </ul>

          <span 
            className={ show ? 'earth-btn-label hideBtn' : 'earth-btn-label showBtn'} 
            onClick={()=>{
                setShow(!show);
                inputRef.current.focus();
            }}>
          {store.currentCityName}
          </span>
        
        

          <FontAwesomeIcon 
                ref={earthRef}
                icon={faEarthAmericas} 
                className={show ? 'earth-icon roll' : 'earth-icon' } 
                onClick={()=>{
                  setShow(!show);
                }}
          /> 
            <span className={show ? 'show moon' : 'moon'}></span>
            <span className={show ? 'show sun' : 'sun'}></span>
  
      </div>
      
    </div>
  )
}
export default observer(SearchInput);