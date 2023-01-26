import React from 'react';
import './loadingStartPage.scss';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadingStartPage(props) {
  return (
    <div className='loading'>
          <div className='loading-wrapper'>
          <div className='loading-rainbow'>
            <span className='inner-line-1'></span>
            <span className='inner-line-2'></span>
            <span className='inner-line-3'></span>
            <span className='inner-line-4'></span>
          </div>
          <div className='loading-snow_wrapper'>
            <FontAwesomeIcon className="snow1" icon={faSnowflake}/>
            <FontAwesomeIcon className="snow2" icon={faSnowflake}/>
            <FontAwesomeIcon className="snow3" icon={faSnowflake}/>
            <FontAwesomeIcon className="snow4" icon={faSnowflake}/>
            <FontAwesomeIcon className="snow5" icon={faSnowflake}/>
            <FontAwesomeIcon className="snow6" icon={faSnowflake}/>
            <FontAwesomeIcon className="snow7" icon={faSnowflake}/>
            <FontAwesomeIcon className="snow8" icon={faSnowflake}/>
          </div>
          <div className='loading-text'><b>Weather Forecast</b> 
            <span>{props.text}</span>
          </div>
      </div>
    </div>


  )
}
