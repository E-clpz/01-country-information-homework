import './App.css';
import axios from 'axios';
import {useState} from 'react';
import getContinentColor from "./helpers/getRegionColour.js";
import worldMap from "./assets/world_map.png"
import population from "./helpers/population.js";

function App() {
    const [countries, setCountries] = useState([]);

    const [error, toggleError] = useState(false);

    const [countryInfo, setCountryInfo] = useState({});

    const [searchQuery, setSearchQuery] = useState('');

        async function fetchWorldinfo() {
        toggleError(false);
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all');
            console.log(result.data);

            const sortedPop = result.data.sort((a, b) => a.population - b.population);
            setCountries(sortedPop);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    async function fetchCountryInfo(countryName) {
        toggleError(false);
        try {
            const result = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
            console.log(result.data);
            const country = result.data[0];
            console.log("Name:", country);
            const countryCapital = result.data[0].capital
            console.log("Capital:", countryCapital);
            setCountryInfo(country);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }

    }
    const handleSearch = (event) => {
        if (event.key === "Enter" || event.type === "click") {
            if (searchQuery) {
                fetchCountryInfo(searchQuery);
                setSearchQuery("");
            } else {
                toggleError(true);
            }
        }
    };

    return (
        <>
            <header>
                <img
                    src={worldMap}
                    alt="World map"
                    style={{width: "1000px"}}
                />
            </header>
            <body>
            <h1>World Regions</h1>
            <button type="button" onClick={fetchWorldinfo}>
                Press button for info on the world!
            </button>
            {error && (
                <p className="error-message">
                    Something went wrong while trying to fetch the world information. Please try again!
                </p>
            )}
            <section className="section">
                <ul className="item-list">
                    {countries.map((country) => (
                        <li
                            key={country.cca3}
                            className={getContinentColor(country.region, country.subregion)}
                        >
                            <br/>
                            <img
                                className="flag"
                                src={country.flags.svg}
                                alt="flag of country"
                                style={{width: "50px", height: "30px"}}
                            />
                            {country.name.common}
                            <br/>
                            <p>Has a population of {country.population + " million "} people</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="section">
                {countryInfo.name && (
                    <>
                        <h2>
                            <img
                                src={countryInfo.flags.svg}
                                alt={`Flag of ${countryInfo.name.common}`}
                                style={{width: "50px", height: "30px"}}
                            />
                            {countryInfo.name.common}
                        </h2>
                        <p>
                            {countryInfo.name.common} is situated in {countryInfo.subregion} and the capital is{" "}
                            {countryInfo.capital ? countryInfo.capital[0] : "No capital available"}.
                        </p>
                        <p>
                            It has a population of {population(countryInfo.population)} million people and it borders
                            with{" "}
                            {countryInfo.borders ? countryInfo.borders.length : 0} neighboring countries.
                        </p>
                    </>
                )}
            </section>
            <section>
                <h2>Search country information</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Enter country name"
                />
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
                {error && (
                    <p className="error-message">
                        Something went wrong while trying to fetch the country information. Please try again!
                    </p>
                )}
            </section>
            </body>
        </>
    );
}

export default App
