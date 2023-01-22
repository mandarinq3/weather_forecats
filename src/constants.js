import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCloud, 
  faCloudBolt, 
  faCloudShowersHeavy, 
  faCloudSun, 
  faCloudSunRain, 
  faSmog, 
  faSnowflake, 
  faSun 
} from '@fortawesome/free-solid-svg-icons';

export const cities = [
    { name: "Ashgabat", longitude: 37.95, latitude: 58.3833 },
    { name: "Paris", longitude: 2.35, latitude: 48.85 },
    { name: "London", longitude: -0.12, latitude: 51.50 },
    { name: "Rome", longitude: 12.49, latitude: 41.90 },
    { name: "Berlin", longitude: 13.40, latitude: 52.52 },
    { name: "Madrid", longitude: -3.70, latitude: 40.41 },
    { name: "Amsterdam", longitude: 4.89, latitude: 52.37 },
    { name: "Vienna", longitude: 16.37, latitude: 48.20 },
    { name: "Barcelona", longitude: 2.17, latitude: 41.38 },
    { name: "Moscow", longitude: 37.61, latitude: 55.75 },
    { name: "Istanbul", longitude: 28.97, latitude: 41.00 },
    { name: "Dublin", longitude: -6.26, latitude: 53.34 },
    { name: "Budapest", longitude: 19.04, latitude: 47.49 },
    { name: "Oslo", longitude: 10.75, latitude: 59.91 },
    { name: "Stockholm", longitude: 18.07, latitude: 59.32 },
    { name: "Zurich", longitude: 8.54, latitude: 47.37 },
    { name: "Brussels", longitude: 4.35, latitude: 50.85 },
    { name: "Copenhagen", longitude: 12.56, latitude: 55.67 },
    { name: "Lisbon", longitude: -9.13, latitude: 38.72 },
    { name: "Prague", longitude: 14.43, latitude: 50.07 },
    { name: "Athens", longitude: 23.72, latitude: 37.98 },
];

export const condition = [
  {
    code:[0],
    description:'Clear sky',
    icon: <FontAwesomeIcon icon={faSun}/>
  },
  {
    code:[1, 2, 3],
    description:'	Mainly clear, partly cloudy, and overcast',
    icon: <FontAwesomeIcon icon={faCloudSun}/>
  },
  {
    code:[45, 48],
    description:'	Fog and depositing rime fog',
    icon: <FontAwesomeIcon icon={faSmog}/>
  },
  {
    code:[51, 53, 55],
    description:'	Drizzle: Light, moderate, and dense intensity',
    icon: <FontAwesomeIcon icon={faCloud}/>
  },
  {
    code:[56, 57],
    description:'	Freezing Drizzle: Light and dense intensity',
    icon: <FontAwesomeIcon icon={faCloud}/>
  },
  {
    code:[61, 63, 65],
    description:'	Rain: Slight, moderate and heavy intensity',
    icon: <FontAwesomeIcon icon={faCloudSunRain}/>
  },
  {
    code:[66, 67],
    description:'	Freezing Rain: Light and heavy intensity',
    icon: <FontAwesomeIcon icon={faCloudShowersHeavy}/>
  },
  {
    code:[71, 73, 75],
    description:'	Snow fall: Slight, moderate, and heavy intensity',
    icon: <FontAwesomeIcon icon={faSnowflake}/>
  },
  {
    code:[77],
    description:'Snow grains',
    icon: <FontAwesomeIcon icon={faSnowflake}/>
  },
  {
    code:[80, 81, 82],
    description:'	Rain showers: Slight, moderate, and violent',
    icon: <FontAwesomeIcon icon={faCloudShowersHeavy}/>
  },
  {
    code:[85, 86],
    description:'Snow showers slight and heavy',
    icon: <FontAwesomeIcon icon={faSnowflake}/>
  },
  {
    code:[95],
    description:'Thunderstorm: Slight or moderate',
    icon: <FontAwesomeIcon icon={faCloudBolt}/>
  
  },
  {
    code:[96, 99],
    description:'Thunderstorm with slight and heavy hail',
    icon: <FontAwesomeIcon icon={faCloudBolt}/>
  
  },
]

export const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const daysList = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
];

