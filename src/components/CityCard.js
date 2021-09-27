// Library
import React, { useContext } from 'react'
import style from 'styled-components';
// Views

// Components
// Files
import { FavoriteContext } from '../context/Favorite.Context';
import Snow from '../assets/neige.jpg'
import Mist from '../assets/brumeux.jpg'
import Clear from '../assets/soleil.jpg'
import Clouds from '../assets/nuageux.jpg'
import Thunderstorm from '../assets/orageux.jpg'
import Rain from '../assets/pluie.jpg'

// style & CSS
import '../App.css';
const CardStyle = style.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 10px;
    
`;
const Result = style.div`
    width: 450px;
    padding-bottom: 2rem;
    margin: 3rem 2rem 5rem 0;
    border: solid black 2px;


    h3{
        font-size: 2rem;
        margin: 1.5rem 2rem;
        text-align: center;
        background: dimgray;
    }
    .btn-remove-fav{
        width: 150px;
        padding: 1rem;
        margin-left: 8rem;
        border-radius: 3px;
        background: skyblue;
    }
    background-image: ${(props) => {
        switch(props.weather){
            case "Rain":
            return `url(${Rain})`;
                
            case "Clouds":
            return `url(${Clouds})`;
                
            case "Thunderstorm":
            return `url(${Thunderstorm})`;
                
            case "Clear":
            return `url(${Clear})`;
                
            case "Mist":
            return `url(${Mist})`;
                
            case "Snow":
            return `url(${Snow})`;
            
            default: 
        }
    }};
    background-size: cover;
`;
const WeatherInfo = style.div`
    display: flex;
    align-items: center;
    justify-content: center;


    p{
        margin-right: 1rem;
        color: ${(props) => {
            switch(props.weather){
                case "Rain":
                return "black";
                    
            default: 
            }
        }};
        background-color: ${(props) => {
            switch(props.weather){
                case "Rain":
                return "gray";
                    
                default: 
            }
        }};
    }
    span{
        font-weight: 900;
    }
    img{
        // background: red;
        border-radius: 50px;
    }
`;


const CityCard = () => {
    const {favoriteCity, setfavoriteCity} = useContext(FavoriteContext)

    const removeFavorite = (name) => { 
        let fav = favoriteCity.filter(fav => fav.name !== name)
        console.log(fav)
        setfavoriteCity(fav)
            console.log(' fav -> ', favoriteCity)
            console.log(' setfav -> ', setfavoriteCity)
    }

    return (
        favoriteCity &&
        <CardStyle>
                {favoriteCity.map( (city, index) => city &&
                    <Result key={index}  weather={city.weather[0].main}>
                        <h3>{city.name}</h3>
                        <WeatherInfo weather={city.weather[0].main}>
                            <p> <span>Weather: </span> {city.weather[0].main}</p>
                            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="icon-meteo" />
                            </WeatherInfo>
                            <button onClick={() => removeFavorite(city.name)} className="btn-remove-fav" >Remove to favorite</button>
                    </Result>
                )}
        </CardStyle>
    )
}

export default CityCard;