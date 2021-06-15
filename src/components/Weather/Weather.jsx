import React, { useState } from 'react';
import classes from './Weather.css';

const Weather = () => {

    let [location, setLocation] = useState();
    let [currentWeather, setCurrentWeather] = useState({});
    let [icon, setIcon] = useState("01d");
    
    function getCurrentWeather(e) {
        e.preventDefault();

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a17480f70f0d4368ad0b5eabd0e37b66`, {
            "method": "GET"            
        })
        .then(response => response.json())
        .then(response => {
            setCurrentWeather(response);    
            setIcon(response.weather[0].icon)
        });
    }

    return (
        <div>
            <h2>How's the weather out there?</h2>
            <form onSubmit={getCurrentWeather}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={classes.textInput}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />                
               
                <button className={classes.Button} type="submit">Get Weather</button>
            </form>
            <div class="weatherContainer">
                <div class="weatherPresenter">
            {
                currentWeather && location && (
                    <div className="weatherInfo">
                        <img src={"http://openweathermap.org/img/w/" + icon + ".png"} /><br/>
                        <b>{currentWeather.main && Math.abs(currentWeather.main.temp - 273.15).toString().substr(0 ,5)} {currentWeather.main && <span>Celcius</span>}</b><br/>
                    
                    </div>
                )
            }
           
             </div>  
            </div>          
        </div>
    )
}

export default Weather;