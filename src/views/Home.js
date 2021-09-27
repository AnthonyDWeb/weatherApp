// Library
import { useState, useEffect, useContext } from 'react';
import style from 'styled-components'

// Views
// Components
import Citymap from '../components/CityMap';
// import Citymap from '../components/CityMap2';
// files
import { FavoriteContext } from '../context/Favorite.Context';
import weatherSearch from '../Api';
import Snow from '../assets/neige.jpg'
import Mist from '../assets/brumeux.jpg'
import Clear from '../assets/soleil.jpg'
import Clouds from '../assets/nuageux.jpg'
import Thunderstorm from '../assets/orageux.jpg'
import Rain from '../assets/pluie.jpg'

// style & CSS
import '../App.css';
const WeatherStyle = style.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;

    .input-onchage{
        margin: 0 0.5rem 0.5rem 3rem;
        width: 250px;
        padding-left: 0.3rem;
    }
    button{
        width: 50px;
    }
`;
const Result = style.div`
    margin: 3rem 0 5rem 0;

    h3{
        font-size: 2rem;
        margin: 1.5rem 25rem;
        background: dimgray;
    }
    .btn-add-fav{
        width: 150px;
        padding: 1rem;
        border-radius: 3px;
        background: skyblue;
    }
    #mapid { height: 180px; }
`;
const WeatherInfo = style.div`
    display: flex;
    align-items: center;
    justify-content: center;

    p{
        margin-right: 1rem;
    }
    span{
        font-weight: 900;
    }
    img{
        // background: red;
        border-radius: 50px;
    }
`;
const WeatherInput = style.div`
    display: flex;
    align-items: center;
    justify-content: center;

    input {
        margin: 0.5rem;
    }
`;



const Background = style.div`
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
const Map = style.div`
    display: flex;
    widht: 100%;
    justify-content: center;
    margin-bottom: 1rem;
`;

const Home = () => {
    const defaultCity = () => JSON.parse(localStorage.getItem('weatherCity'))
    const [city,setCity] = useState(defaultCity)
    const [isCheked, setIsCheked] = useState(false)
    const [citySearched, setCitySearch] = useState(null)
    const {favoriteCity, setfavoriteCity} = useContext(FavoriteContext)
    
    
    useEffect( () =>{

        const defaultWeather = async() =>{
            if (city) {
                const res = await weatherSearch(city);
                setIsCheked(true)
                console.log("res ->", res);
                setCitySearch(res);
            }
        }
        defaultWeather();
        console.log('city ->', `${city}`)
    } ,[])
    
    const myCity = (e) =>{setCity(e.target.value) }

    const myWeather = async(e) => {
        e.preventDefault()
        const cityInformation = await weatherSearch(city)
        if (cityInformation.message) {
            alert("sorry, retry a bit later !")
        } else {
            setIsCheked(false)
            setCitySearch(cityInformation)
        }
    }
   
    const checkChange = () => {
        console.log('is checked ->', isCheked)
        isCheked ? localStorage.removeItem('weatherCity') :  
        localStorage.setItem('weatherCity',JSON.stringify(citySearched.name))
        setIsCheked(!isCheked)
    }

    const setFavorite = () => {
        if (favoriteCity.length < 3){
            setfavoriteCity( prevState => {
                return [...prevState, citySearched]
            })
        } 
        if (favoriteCity.length === 2){
            alert("you have reached the maximum number of cities in your favorites")
        } else if (favoriteCity.length === 3) {
            alert("you have already reached the maximum number of cities in your favorites")
        }
    }
    // console.log("coord", citySearched.coord.lon)
    return (
        citySearched ? 
        <Background weather={citySearched.weather[0].main}>
            <h1 className="main-title">Home</h1>
            <div className="container">
                <WeatherStyle className="weather-input">
                    <div> 
                        <form >
                            <input className="input-onchage" onChange={myCity} type="text" maxLength={20} placeholder="Enter city name" />
                            <button onClick={myWeather} >Check</button>
                        </form>
                    </div>
                    {citySearched &&  (
                        <Result>
                            <h3>{citySearched.name}</h3>
                            <WeatherInfo>
                                <p> <span>Weather: </span> {citySearched.weather[0].main}</p>
                                <img src={`https://openweathermap.org/img/wn/${citySearched.weather[0].icon}@2x.png`} alt="icon-meteo" />
                            </WeatherInfo>
                            <Map className="">
                                <Citymap longitude={citySearched.coord.lon} latitude={citySearched.coord.lat}/>
                            </Map>
                                <button onClick={setFavorite} className="btn-add-fav" >Add to favorite</button>
                            <WeatherInput>
                                <p>City by default</p>
                                <input onClick={checkChange} type="checkbox" checked={isCheked} /> 
                            </WeatherInput>
                        </Result>
                    )}
                </WeatherStyle>
            </div>
        </Background> :
        <div>
            <h1 className="main-title">Home</h1>
            <div className="container">
                <WeatherStyle className="weather-input">
                    <div> 
                        <form >
                            <input className="input-onchage" onChange={myCity} type="text" maxLength={20} placeholder="Enter city name" />
                            <button onClick={myWeather} >Check</button>
                        </form>
                    </div>
                    {citySearched &&  (
                        <Result>
                            <h3>{citySearched.name}</h3>
                            <WeatherInfo>
                                <p> <span>Weather: </span> {citySearched.weather[0].main}</p>
                                <img src={`https://openweathermap.org/img/wn/${citySearched.weather[0].icon}@2x.png`} alt="icon-meteo" />
                            </WeatherInfo>
                                <button onClick={setFavorite} className="btn-add-fav" >Add to favorite</button>
                            <WeatherInput>
                                <p>City by default</p>
                                <input onClick={checkChange} type="checkbox" checked={isCheked} /> 
                            </WeatherInput>
                        </Result>
                    )}
                </WeatherStyle>
            </div>
        </div>
    )


}

export default Home;