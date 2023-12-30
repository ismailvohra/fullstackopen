import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const weatherBaseUrl1 = `https://api.open-meteo.com/v1/forecast?latitude=`
  const weatherBaseUrl2 = `&longitude=`
  const weatherBaseUrl3 = `&current=temperature_2m,wind_speed_10m`
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherResult, setWeatherResult] = useState([])
  const [city, setCity] = useState(null)

  useEffect(()=> {
    console.log("boss")
    axios.get(baseUrl)
    .then(response => {
      setCountries(response.data)
    })
  },[])

  useEffect(() => {
   
    if (city) {
      axios
        .get(`${weatherBaseUrl1}${city.lat}${weatherBaseUrl2}${city.lon}${weatherBaseUrl3}`)
        .then((response) => {
        
          setWeatherResult(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data', error);
        });
    }
  }, [city]);


  const resultQuery = () => {
    if (!searchQuery){
      return (
        <p>Too many matches, specify another filter</p>
      )
    }

    const namesOfCountries = countries.map(element => element.name.common)
    const filteredNamesOfCountries = namesOfCountries.filter(element => element.toLowerCase().includes(searchQuery.toLowerCase()))
    const lengthCheck = filteredNamesOfCountries.length

    if (lengthCheck > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }

    const showCountry = (selectedCountry) => {
      setSearchQuery(selectedCountry)
    }

    if (lengthCheck <10 && lengthCheck>1){
      return (
        <ul>
        {filteredNamesOfCountries.map(element => <li key={element}>{element}<button onClick={() => showCountry(element)}>show</button></li>)}
        </ul>
      )
    }


    const exactMatch = countries.filter(element => element.name.common.toLowerCase() === filteredNamesOfCountries[0].toLowerCase())[0]
    
    const lat = exactMatch.capitalInfo.latlng[0]
    const lon = exactMatch.capitalInfo.latlng[1]
    
    if ((!city) || (city.lon != lon && city.lat!=lat)){
      setCity({lon: lon, lat: lat})
    }
    console.log(city)
    console.log(weatherResult)

    if(!city){
      return null
    }

    if (!weatherResult){
      return null
    }
    return(
      <div>
        <h2>{exactMatch.name.common}</h2>
        <p>capital {exactMatch.capital[0]}</p>
        <p>area {exactMatch.area}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(exactMatch.languages).map(element => <li key={element}>{element}</li>)}
        </ul>
        <img src={exactMatch.flags.png} alt={exactMatch.flags.alt} />
        <h2>Weather in {exactMatch.capital[0]}</h2>
        <p>temperature {weatherResult?.current?.temperature_2m} Celcius</p>
        <p>wind {weatherResult?.current?.wind_speed_10m} km/h</p>
      </div>
    )
  }

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
  }
  return (
    <div>
      find countries <input value={searchQuery} onChange={handleSearchQuery} />
      
      {resultQuery()}
    </div>
  )
}


export default App
