import React from 'react';
import { icons } from '../../constants';
import './secondaryCard.scss';


export default function SecondaryCard(props) {

  const icon = icons.filter((item)=>{
    return item.code.includes(props.code);
  })


  return (
    <div className='secondary-card'>
      <div className='container'>
        <div className='col col-left'>
          <span className='day'>{props.day}</span>
        </div>
        
        <div className='col col-right'>
          <span className='icon'>{icon[0]!==undefined ? icon[0].icon : '--'}</span>
          <span className='temperature'>{props.temp}°</span>
        </div>
        
      </div>
    </div>
  )
}

