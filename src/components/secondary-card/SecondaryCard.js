import React from 'react';
import { condition } from '../../constants';
import './secondaryCard.scss';


export default function SecondaryCard(props) {

  const forecast = condition.filter((item)=>{
    return item.code.includes(props.code);
  })


  return (
    <div className='secondary-card'>
      <div className='container'>
        <span>{props.day}</span>
        <span>{forecast[0].icon}</span>
        <span>{props.temp}°</span>
      </div>
    </div>
  )
}

