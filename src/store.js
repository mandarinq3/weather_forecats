import axios from "axios";
import { observable } from "mobx";

const store = observable({

forecastData: null,
initializeForecastData(data){
  this.forecastData = data;
},
currentCityName: null,
initializeCurrentCityName(name){
  this.currentCityName = name;
},

currentWeather:null,
setCurrentWeather(forecast){
  this.currentWeather = forecast;
},

getForecastData(lat,lon){
  let URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset&current_weather=true&timezone=auto`;
  return axios.get(URL);
},

getUserCoordinates (){
  return new Promise((resolve, reject)=>{
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
},

getUserCityName(lat,lon){
  return axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
},




})// store

export default store; 