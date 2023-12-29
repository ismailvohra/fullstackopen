import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(()=> {
    axios.get(baseUrl)
    .then(response => {
      setCountries(response.data)
    })
  },[])

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

    if (lengthCheck <10 && lengthCheck>1){
      return (
        <ul>
        {filteredNamesOfCountries.map(element => <li key={element}>{element}</li>)}
        </ul>
      )
    }

    const exactMatch = countries.filter(element => element.name.common.toLowerCase() === filteredNamesOfCountries[0].toLowerCase())[0]
    console.log(exactMatch)
    return(
      <div>
        <h2>{exactMatch.name.common}</h2>
        <p>capital {exactMatch.capital[0]}</p>
        <p>area {exactMatch.area}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(exactMatch.languages).map(element => <li>{element}</li>)}
        </ul>
        <img src={exactMatch.flags.png} alt={exactMatch.flags.alt} />
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
