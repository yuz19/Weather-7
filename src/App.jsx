import './App.css'
 
import {useEffect, useState} from 'react'
const api={
  key:import.meta.env.VITE_API_KEY,
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [search,setSearch]=useState('');
  const [weather,setWeather]=useState({});
  //morning  Evening Night
  const [TimePeriod,SetTimePeriode]=useState('');
  const [contentSun,setContentSun]=useState('')
    
  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  //
  const searchPressed=()=>{
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then(res=>res.json())
      .then((result)=>{
        //console.log(result)
        setWeather(result)
      })
  }
  function getTime(sunriseTimestamp,sunsetTimestamp){
 

        // Convert Unix timestamps to milliseconds
        const sunriseMillis = sunriseTimestamp * 1000;
        const sunsetMillis = sunsetTimestamp * 1000;

        // Create Date objects
        const sunriseDate = new Date(sunriseMillis);
        const sunsetDate = new Date(sunsetMillis);

        // Get hours and minutes
        const sunriseHours = sunriseDate.getHours();
        const sunriseMinutes = sunriseDate.getMinutes();
        const sunsetHours = sunsetDate.getHours();
        const sunsetMinutes = sunsetDate.getMinutes();

        // Format as "h:min"
        const sunriseFormatted = `${sunriseHours}:${String(sunriseMinutes).padStart(2, '0')}`;
        const sunsetFormatted = `${sunsetHours}:${String(sunsetMinutes).padStart(2, '0')}`;
        
 

        // Create a new Date object
        const now = new Date();

        // Get the current hours and minutes
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        // Calculate the time in minutes since midnight for sunrise and sunset
        const sunriseTimeInMinutes = sunriseHours * 60 + sunriseMinutes;
        const sunsetTimeInMinutes = sunsetHours * 60 + sunsetMinutes;
        const currentTimeInMinutes = currentHours * 60 + currentMinutes;

        // Check the time period based on minutes
        if (
          currentTimeInMinutes >= sunriseTimeInMinutes &&
          currentTimeInMinutes < sunsetTimeInMinutes
        ) {
          SetTimePeriode('morning');
        } else if (
          currentTimeInMinutes >= sunsetTimeInMinutes ||
          currentTimeInMinutes < sunriseTimeInMinutes
        ) {
          SetTimePeriode('night');
        } else {
          SetTimePeriode('evening');
        }
        
        setContentSun(          
        <div className='mt-4' >
        {sunriseFormatted}-{sunsetFormatted}
        </div>)

      

  }

  useEffect(() => {
    if (weather.sys) {
      // Calculate time period here if needed
      getTime(weather.sys.sunrise, weather.sys.sunset);
    }
  }, [weather]);
  // ${TimePeriod === 'night' ? 'bg-night' : 'bg-morning'}
 
  return (
    <div className={`App  ${TimePeriod === 'morning' ? 'bg-morning bg-center' : 'bg-night'} bg-cover min-h-screen flex justify-center items-center`}>

      <header className={`App-Header  ${TimePeriod === 'morning' ? 'text-GreyNight' : 'text-WhiteNight'}  w-2/3   flex flex-col justify-center items-center`}>
        
            <h1 className=' text-6xl m-10 border-b-2 border-cyan-400 w-75 '>Weather <span className={`text-7xl  ${TimePeriod === 'morning' ? 'text-white' : 'text-cyan-400'}`}>7</span></h1>
            
            <div className='w-full flex items-center shadow-xl'>
              <input className='h-20 w-2/3 bg-stone-50 text-3xl focus:outline-none text-GreyNight capitalize p-2' type="text" placeholder='Search.....' onChange={(e)=>{setSearch(e.target.value)}}/>
              <button onClick={searchPressed} className='bg-cyan-400 focus:outline-none h-20 w-1/3 hover:bg-stone-500  text-3xl'>Search</button>
            </div>
          {typeof weather.main !=='undefined' ? 

            <div className='flex flex-col items-center'>
              <p className='text-4xl mt-10 mb-10  '> {weather.name}</p>
              <p className='text-4xl mb-10   '> {weather.main.temp+'º'}</p>
              <p className={`text-xl   ${TimePeriod === 'night' ? 'text-YellowNight' : 'text-pink-900'}`}> {weather.weather[0].main}</p>            
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
              <p className={`text-xl   ${TimePeriod === 'night' ? 'text-YellowNight' : 'text-white'}`}>({weather.weather[0].description})</p>
              {contentSun}
            </div>
          : ''}

        
      </header>
    </div>
  )
}

export default App
