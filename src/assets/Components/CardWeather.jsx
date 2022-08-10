import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({lat, lon}) => {

    const APIKey= 'cc5c8ab1e4a7785ee10f7b18eca4be2f'
  
    const URL=  `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`



    const [weather, setweather] = useState()
    const [temperature, settemperature] = useState()
    const [isCelsius, setisCelsius] = useState(true)
    const [isLoading, setisLoading] = useState(true)

    useEffect (() => {
        if (lat) {
        const APIKey= 'cc5c8ab1e4a7785ee10f7b18eca4be2f'
        const URL=  `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}` 
    
            axios.get (URL)
            .then (res => {
                setweather (res.data)
                const temp= {
                    celsius: `${Math.round(res.data.main.temp -273.15)} °C ` ,
                    fahrenheit:`${Math.round((res.data.main.temp -273.15) * 9 / 5 + 32)} °F`
                }
                settemperature (temp)
                setisLoading(false)
            })
            .catch (err => console.log (err))

    }
    } , [lat, lon])

    console.log(weather)

    const handleClick= () =>setisCelsius (!isCelsius)

    if(isLoading){
        return <LoadingScreen/>
    } else {
 return (
    <article>
        <h1>Weather App</h1>
        <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        <div>
            <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            <div>
                <h3>"{weather?.weather[0].description}"</h3>
                <ul>
                <li><span>Wind Velocity</span>{weather?.wind.speed} m/s</li>
                <li><span>Cloud Density</span>{weather?.clouds.all}%</li>
                <li><span>Pressure</span>{weather?.main.pressure}hPa</li>
                </ul>
            </div>
        </div>
        <h2>{isCelsius ? temperature?.celsius : temperature?.fahrenheit}</h2>
        <button onClick={handleClick}> {isCelsius ? 'Change to °F' : 'Change to °C'}</button>
    </article>
  )
}
}
export default CardWeather