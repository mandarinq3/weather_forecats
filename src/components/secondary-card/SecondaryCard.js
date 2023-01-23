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
        <span>{props.day}</span>
        <span>{icon[0].icon}</span>
        <span>{props.temp}°</span>
      </div>
    </div>
  )
}

